import express from 'express';
import { getFuncionarios, createFuncionario } from '../controllers/funcionarioController.js';
import { getMe } from "../controllers/funcionarioController.js";
import { authenticate } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/', getFuncionarios); // Rota para listar todos os funcionários
router.post('/', createFuncionario); // Rota para criar um novo funcionário
router.get("/me", authenticate, getMe);


export default router;
