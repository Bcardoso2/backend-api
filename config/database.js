import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

// Configuração da conexão com MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nome do banco
  process.env.DB_USER,       // Usuário
  process.env.DB_PASSWORD,   // Senha
  {
    host: process.env.DB_HOST,   // Host (localhost para Docker Desktop)
    dialect: process.env.DB_DIALECT || 'mysql', // Tipo do banco (mysql)
    port: process.env.DB_PORT || 3306,   // Porta do MySQL
    logging: console.log,        // Mostra logs das queries (opcional)
  }
);


export default sequelize;

console.log('Configurações do banco:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_DIALECT:', process.env.DB_DIALECT);
