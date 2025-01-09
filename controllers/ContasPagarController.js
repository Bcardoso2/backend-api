import ContaPagar from '../models/ContasPagarModel.js';

// Controlador para listar todas as contas a pagar
export const getAllContasPagar = async (req, res) => {
  try {
    const contas = await ContaPagar.findAll();
    res.status(200).json(contas);
  } catch (error) {
    console.error('Erro ao buscar contas a pagar:', error.message);
    res.status(500).json({ error: 'Erro ao buscar contas a pagar' });
  }
};

// Controlador para criar uma nova conta a pagar
export const createContaPagar = async (req, res) => {
  const {
    fornecedor_id,
    nome_fornecedor,
    codigo_referencia,
    data_competencia,
    data_vencimento,
    valor_original,
    descricao,
    forma_pagamento,
  } = req.body;
  try {
    const novaConta = await ContaPagar.create({
      fornecedor_id,
      nome_fornecedor,
      codigo_referencia,
      data_competencia,
      data_vencimento,
      valor_original,
      descricao,
      forma_pagamento,
    });
    res.status(201).json({ message: 'Conta a pagar criada com sucesso', conta: novaConta });
  } catch (error) {
    console.error('Erro ao criar conta a pagar:', error.message);
    res.status(500).json({ error: 'Erro ao criar conta a pagar' });
  }
};

// Controlador para buscar uma conta a pagar por ID
export const getContaPagarById = async (req, res) => {
  const { id } = req.params;
  try {
    const conta = await ContaPagar.findByPk(id);
    if (!conta) {
      return res.status(404).json({ error: 'Conta a pagar não encontrada' });
    }
    res.status(200).json(conta);
  } catch (error) {
    console.error('Erro ao buscar conta a pagar:', error.message);
    res.status(500).json({ error: 'Erro ao buscar conta a pagar' });
  }
};

// Controlador para atualizar uma conta a pagar
export const updateContaPagar = async (req, res) => {
  const { id } = req.params;
  const {
    fornecedor_id,
    nome_fornecedor,
    codigo_referencia,
    data_competencia,
    data_vencimento,
    valor_original,
    descricao,
    forma_pagamento,
  } = req.body;
  try {
    const conta = await ContaPagar.findByPk(id);
    if (!conta) {
      return res.status(404).json({ error: 'Conta a pagar não encontrada' });
    }
    await conta.update({
      fornecedor_id,
      nome_fornecedor,
      codigo_referencia,
      data_competencia,
      data_vencimento,
      valor_original,
      descricao,
      forma_pagamento,
    });
    res.status(200).json({ message: 'Conta a pagar atualizada com sucesso', conta });
  } catch (error) {
    console.error('Erro ao atualizar conta a pagar:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar conta a pagar' });
  }
};

// Controlador para excluir uma conta a pagar
export const deleteContaPagar = async (req, res) => {
  const { id } = req.params;
  try {
    const conta = await ContaPagar.findByPk(id);
    if (!conta) {
      return res.status(404).json({ error: 'Conta a pagar não encontrada' });
    }
    await conta.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir conta a pagar:', error.message);
    res.status(500).json({ error: 'Erro ao excluir conta a pagar' });
  }
};
