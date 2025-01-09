import express from 'express';
import {
  getAllContasPagar,
  getContaPagarById,
  createContaPagar,
  updateContaPagar,
  deleteContaPagar,
} from '../controllers/ContasPagarController.js';

const router = express.Router();

router.get('/', getAllContasPagar); // Para listar todas as contas a pagar
router.get('/:id', getContaPagarById); // Para buscar uma conta específica por ID
router.post('/', createContaPagar); // Para criar uma nova conta
router.put('/:id', updateContaPagar); // Para atualizar uma conta existente
router.delete('/:id', deleteContaPagar); // Para excluir uma conta

export default router;
