import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cargo = sequelize.define(
  'Cargo',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'cargos',
    timestamps: false,
  }
);

export default Cargo;
