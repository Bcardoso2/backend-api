import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PedidoProduto = sequelize.define('PedidoProduto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'pedido_produtos',
  timestamps: false,
});

export default PedidoProduto;
