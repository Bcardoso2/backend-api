import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';
import Cargo from './Cargo.js'; // Importa o modelo de Cargo para criar a associação

const Funcionario = sequelize.define(
  'Funcionario',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cargo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cargo, // Nome do modelo relacionado
        key: 'id', // Chave na tabela `cargos`
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    salario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    data_admissao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'funcionarios',
    timestamps: false,
  }
);

// Cria a associação entre Funcionarios e Cargos
Funcionario.belongsTo(Cargo, {
  foreignKey: 'cargo_id',
  as: 'cargo',
});



Funcionario.beforeCreate(async (funcionario) => {
  if (funcionario.senha) {
    const salt = await bcrypt.genSalt(10);
    funcionario.senha = await bcrypt.hash(funcionario.senha, salt);
  }
});


export default Funcionario;
