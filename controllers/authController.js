import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Funcionario from '../models/Funcionario.js';

export const login = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const funcionario = await Funcionario.findOne({ where: { usuario: username } });

    if (!funcionario) {
      return res.status(401).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, funcionario.senha);

    if (!senhaValida) {
      return res.status(401).json({ success: false, message: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: funcionario.id, cargo: funcionario.cargo_id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ success: false, message: 'Erro ao realizar login.' });
  }
};
