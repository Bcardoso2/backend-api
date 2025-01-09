import Cliente from '../models/Cliente.js';

export const getAllClientes = async (req, res) => {
  try {
    const { funcionario_id = null } = req.query

    const clientes = await Cliente.findAll({
      where: funcionario_id ? { funcionario_id } : {},
    });

    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

export const createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};
