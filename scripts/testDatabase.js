import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'frigorifico_marajo', 
  'fribest', 
  'fribest', 
  {
    host: '3.23.98.194',
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
  }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco bem-sucedida!');
        const [results] = await sequelize.query('SELECT * FROM produtos'); // Substitua por uma tabela existente
        console.log('Resultados da consulta:', results);
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error.message);
    } finally {
        process.exit();
    }
})();
