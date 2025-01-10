import express from 'express';
import {
  getAllProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from '../controllers/produtoController.js';

const router = express.Router();

router.get('/', getAllProdutos);
router.post('/', createProduto);
router.put('/:id', updateProduto);
router.delete('/:id', deleteProduto);

export default router;
