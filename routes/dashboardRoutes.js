import express from 'express';
import {
  getResumo,
  getTopClientes,
  getEstoqueProdutos,
  getUltimosPedidos,
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/resumo', getResumo);
router.get('/clientes/top', getTopClientes);
router.get('/produtos/estoque', getEstoqueProdutos);
router.get('/pedidos/ultimos', getUltimosPedidos);

export default router;
