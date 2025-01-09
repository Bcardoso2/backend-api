import Produto from '../models/ProdutoModels.js';

// Lista todos os produtos
export const getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Cria um novo produto
export const createProduto = async (req, res) => {
  const {
    codigo,
    ean,
    nome,
    descricao,
    preco_unitario,
    estoque,
    qt_minima,
    qt_maxima,
    observacao,
    categoria,
  } = req.body;

  try {
    const novoProduto = await Produto.create({
      codigo,
      ean,
      nome,
      descricao,
      preco_unitario,
      estoque,
      qt_minima,
      qt_maxima,
      observacao,
      categoria,
    });
    res.status(201).json({ message: 'Produto criado com sucesso', produto: novoProduto });
  } catch (error) {
    console.error('Erro ao criar produto:', error.message);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Atualiza um produto
export const updateProduto = async (req, res) => {
  const { id } = req.params;
  const atualizacoes = req.body;

  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await produto.update(atualizacoes);
    res.status(200).json({ message: 'Produto atualizado com sucesso', produto });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

// Exclui um produto
export const deleteProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await produto.destroy();
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error.message);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
};
