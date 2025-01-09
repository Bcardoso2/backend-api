import Pedido from '../models/Pedido.js';
import Cliente from '../models/Cliente.js';
import Produto from '../models/ProdutoModels.js';
import { Op } from 'sequelize';

// Faturamento e despesas
export const getResumo = async (req, res) => {
  try {
    const faturamento = await Pedido.sum('valor_total', { where: { status: 'concluido' } });
    const despesas = 80000; // Simulação
    res.json({ faturamento, despesas });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar resumo.' });
  }
};

// Clientes que mais compram
export const getTopClientes = async (req, res) => {
  try {
    const clientes = await Pedido.findAll({
      attributes: ['cliente_id', [sequelize.fn('SUM', sequelize.col('valor_total')), 'valorComprado']],
      group: ['cliente_id'],
      include: [{ model: Cliente, as: 'cliente', attributes: ['nome'] }],
      order: [[sequelize.literal('valorComprado'), 'DESC']],
      limit: 5,
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
};

// Estoque de produtos
export const getEstoqueProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({ attributes: ['nome', 'estoque'] });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estoque.' });
  }
};

// Últimos pedidos
export const getUltimosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      order: [['data_pedido', 'DESC']],
      include: [{ model: Cliente, as: 'cliente', attributes: ['nome'] }],
      limit: 10,
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar últimos pedidos.' });
  }
};
