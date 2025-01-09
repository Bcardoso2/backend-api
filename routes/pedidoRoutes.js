import express from 'express';
import { createPedido, getPedidos, updatePedidoStatus } from '../controllers/pedidoController.js';

const router = express.Router();

// Rota para criar um pedido
router.post('/', createPedido);

// Rota para listar pedidos
router.get('/', getPedidos);

router.put('/:id/status', updatePedidoStatus); 

export default router;
