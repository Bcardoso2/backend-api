import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import clientesRoutes from './routes/clientesRoutes.js';
import produtosRoutes from './routes/produtosRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Testa a conexão com o banco
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco realizada com sucesso!');
    await sequelize.sync(); // Sincroniza o banco e cria tabelas automaticamente
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error.message);
    process.exit(1);
  }
})();

// Rotas
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
