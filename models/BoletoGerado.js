import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BoletoGerado = sequelize.define('BoletoGerado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cora_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'ID único do boleto na API da Cora',
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Título ou nome do boleto',
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Valor do boleto',
  },
  status: {
    type: DataTypes.ENUM('CANCELLED', 'DRAFT', 'LATE', 'OPEN', 'PAID', 'RECURRENCE_DRAFT'),
    allowNull: false,
    comment: 'Estado do boleto',
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Data de vencimento do boleto',
  },
  payment_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Data de pagamento, se aplicável',
  },
  cliente_cpf_cnpj: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'CPF ou CNPJ do destinatário',
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Data de criação do registro no sistema',
  },
  atualizado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
    comment: 'Data de última atualização do registro',
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Informações adicionais sobre o boleto',
  },
});

export default BoletoGerado;
