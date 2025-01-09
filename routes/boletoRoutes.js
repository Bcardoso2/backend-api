import express from 'express';
import { getAllBoletos } from '../controllers/boletoController.js';

const router = express.Router();

router.get('/', getAllBoletos);

export default router;
