import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; // Conexão com o banco
import clientRoutes from './routes/clientRoutes.js'; // Rotas de clientes
import produtoRoutes from './routes/produtoRoutes.js';
import contasPagarRoutes from './routes/ContasPagarRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js'; // Rotas de pedidos
import dashboardRoutes from './routes/dashboardRoutes.js';
import funcionarioRoutes from './routes/funcionarioRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Rotas de autenticação
import configureAssociations from './models/associations.js';
import { authenticate } from './middlewares/authMiddleware.js'; // Middleware de autenticação

// Configuração de associações entre modelos
configureAssociations();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware global
app.use(cors());
app.use(express.json());

// Teste de conexão com o banco
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error.message);
    process.exit(1); // Finaliza o processo em caso de erro
  }
})();

app.use('/api/auth', authRoutes); // Rotas de autenticação

// Middleware para proteger rotas privadas
app.use(authenticate);

// Rotas privadas (protegidas)
app.use('/api/clientes', clientRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/contas-a-pagar', contasPagarRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/funcionarios', funcionarioRoutes);


// Rotas padrão para erros 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error('Erro interno no servidor:', err.message);
  res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
