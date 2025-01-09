import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Boleto = sequelize.define('Boleto', {
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'boletos',
  timestamps: false,
});

export default Boleto;
