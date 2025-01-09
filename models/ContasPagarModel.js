import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ContaPagar = sequelize.define('ContaPagar', {
  fornecedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Identificador do fornecedor',
  },
  nome_fornecedor: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nome do fornecedor',
  },
  codigo_referencia: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Código de referência da conta',
  },
  data_competencia: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Data de competência',
  },
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Data de vencimento',
  },
  data_ultimo_pagamento: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Data do último pagamento realizado',
  },
  valor_original: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    comment: 'Valor original da conta',
  },
  valor_em_aberto: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    comment: 'Valor em aberto da conta',
  },
  valor_total_pago: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    comment: 'Valor total pago da conta',
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Descrição da conta a pagar',
  },
  forma_pagamento: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Forma de pagamento',
  },
}, {
  tableName: 'contas_a_pagar',
  timestamps: false, // Desativa os timestamps automáticos
});

export default ContaPagar;
