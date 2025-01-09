import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Funcionario from '../models/Funcionario.js'; // Modelo de Funcionário

const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    // Verifica se os dados foram fornecidos
    if (!usuario || !senha) {
      console.error('Erro: Usuário ou senha não fornecidos.');
      return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
    }

    console.log('Tentativa de login com usuário:', usuario);

    // Busca o funcionário pelo usuário
    const funcionario = await Funcionario.findOne({ where: { usuario } });

    if (!funcionario) {
      console.error('Erro: Usuário não encontrado.');
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    console.log('Usuário encontrado no banco de dados:', funcionario.usuario);

    // Validação da senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, funcionario.senha);

    if (!senhaValida) {
      console.error('Erro: Senha inválida para o usuário:', usuario);
      return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }

    console.log('Senha válida para o usuário:', usuario);

    // Gera o token JWT
    const token = jwt.sign(
      { id: funcionario.id, cargo: funcionario.cargo_id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log('Token gerado com sucesso para o usuário:', usuario);

    // Retorna o token no formato esperado pelo frontend
    return res.json({ success: true, token, message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro interno no servidor:', error.message);
    return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
});

export default router;
