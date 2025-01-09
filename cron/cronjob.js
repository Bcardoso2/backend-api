import axios from 'axios';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import Boleto from './models/Boleto.js';

// Carrega as variáveis do ambiente
dotenv.config();

// Validação inicial
if (!process.env.CORA_API_URL || !process.env.CORA_ACCESS_TOKEN || !process.env.CERT_PATH || !process.env.KEY_PATH) {
  console.error('Erro: Variáveis de ambiente ausentes ou inválidas. Verifique o arquivo .env');
  process.exit(1);
}

const fetchBoletos = async () => {
  console.log('=== Iniciando a execução do cronjob ===');

  try {
    const CORA_API_URL = process.env.CORA_API_URL;
    const CORA_ACCESS_TOKEN = process.env.CORA_ACCESS_TOKEN;

    console.log('Carregando certificados...');
    const certPath = process.env.CERT_PATH;
    const keyPath = process.env.KEY_PATH;

    if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
      console.error(`Erro: Arquivos de certificados não encontrados:
        Certificado: ${certPath}
        Chave: ${keyPath}`);
      process.exit(1);
    }

    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    console.log('Certificados carregados com sucesso.');
    console.log('Configurando agente HTTPS...');
    const httpsAgent = new https.Agent({
      cert,
      key,
    });

    // Configurando intervalo de datas (início do mês atual até hoje)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês atual (0 indexado)
    const startDate = `${year}-${month}-01`; // Início do mês
    const endDate = new Date(year, now.getMonth() + 1, 0).toISOString().split('T')[0]; // Último dia do mês

    console.log(`Buscando boletos de ${startDate} até ${endDate}...`);
    const response = await axios.get(CORA_API_URL, {
      headers: {
        Authorization: `Bearer ${CORA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        start_date: startDate,
        end_date: endDate,
      },
      httpsAgent,
    });

    const boletos = response.data.items || [];
    console.log(`Boletos encontrados: ${boletos.length}`);

    if (boletos.length === 0) {
      console.log('Nenhum boleto foi encontrado para sincronizar.');
      return;
    }

    for (const boleto of boletos) {
      console.log(`Sincronizando boleto: ${boleto.id}`);
      try {
        await Boleto.upsert({
          id_boleto: boleto.id,
          status: boleto.status,
          due_date: boleto.due_date,
          amount: boleto.total_amount,
          customer_name: boleto.customer_name || 'Não informado',
          customer_document: boleto.customer_document || 'Não informado',
          barcode: boleto.payment_options?.bank_slip?.barcode || 'N/A',
        });
        console.log(`Boleto ${boleto.id} sincronizado com sucesso.`);
      } catch (dbError) {
        console.error(`Erro ao inserir/atualizar boleto ${boleto.id}:`, dbError.message);
      }
    }

    console.log('=== Sincronização concluída com sucesso ===');
  } catch (error) {
    if (error.response) {
      console.error('Erro na API da Cora:', error.response.status, error.response.data);
    } else {
      console.error('Erro durante o cronjob:', error.message);
    }
  }
};

export default fetchBoletos;
