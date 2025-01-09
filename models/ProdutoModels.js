import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Produto = sequelize.define('Produto', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Código único do produto',
  },
  ean: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    comment: 'Código EAN do produto, se disponível',
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nome do produto',
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Descrição detalhada do produto',
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    comment: 'Preço unitário do produto',
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Quantidade em estoque do produto',
  },
  qt_minima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Quantidade mínima em estoque para alerta',
  },
  qt_maxima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Quantidade máxima permitida em estoque',
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Observações adicionais sobre o produto',
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Categoria do produto',
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Data de criação do registro do produto',
  },
}, {
  tableName: 'produtos',
  timestamps: false, // Desativa createdAt e updatedAt automáticos
  comment: 'Tabela para armazenar informações dos produtos',
});

export default Produto;
