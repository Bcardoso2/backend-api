import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Pedido = sequelize.define(
  'Pedido',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    funcionario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_pedido: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('Aguardando', 'Embarcando', 'Em transito', 'Entregue', 'Cancelado'),
      defaultValue: 'Aguardando',
      allowNull: false,
    },
  },
  {
    tableName: 'pedidos',
    timestamps: false,
  }
);

export default Pedido;
