import Funcionario from '../models/Funcionario.js';
import Cargo from '../models/Cargo.js'; // Importa o modelo de Cargo
import bcrypt from 'bcrypt'; // Para hash de senhas

// Buscar todos os funcionários com o cargo relacionado
export const getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll({
      include: [
        {
          model: Cargo,
          as: 'cargo', // Nome da associação no modelo
          attributes: ['id', 'nome'], // Campos que deseja retornar da tabela cargos
        },
      ],
    });
    res.json(funcionarios);
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    res.status(500).json({ error: 'Erro ao buscar funcionários.' });
  }
};

// Criar um novo funcionário
export const createFuncionario = async (req, res) => {
  const { nome, cpf, cargo_id, salario, telefone, email, data_admissao, usuario, senha } = req.body;

  try {
    // Verificar se o CPF ou usuário já existe
    const cpfExistente = await Funcionario.findOne({ where: { cpf } });
    const usuarioExistente = await Funcionario.findOne({ where: { usuario } });

    if (cpfExistente) {
      return res.status(400).json({ error: 'CPF já cadastrado.' });
    }
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    // Hash da senha antes de salvar
    const hashedPassword = bcrypt.hashSync(senha, 10);

    const funcionario = await Funcionario.create({
      nome,
      cpf,
      cargo_id,
      salario,
      telefone,
      email,
      data_admissao,
      usuario,
      senha: hashedPassword,
    });

    res.status(201).json(funcionario);
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    res.status(500).json({ error: 'Erro ao criar funcionário.' });
  }
};
export const getMe = async (req, res) => {
  try {

    const funcionario = await Funcionario.findByPk(req.user.id, {
      attributes: ["id", "nome", "cargo_id"], // Retorna apenas os campos necessários
    });

    if (!funcionario) {
      return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
    }

    res.json(funcionario);
  } catch (error) {
    console.error("Erro ao buscar informações do funcionário:", error);
    res.status(500).json({ success: false, message: "Erro interno no servidor" });
  }
};
