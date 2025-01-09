import jwt from 'jsonwebtoken';

// Middleware de autenticação
export const authenticate = (req, res, next) => {
  // Extraindo o token do cabeçalho "Authorization"
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token não fornecido ou mal formatado.' });
  }

  try {
    // Verificando e decodificando o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Armazena os dados do usuário no objeto `req`
    req.user = decoded;

    // Permite que a requisição continue
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error.message);
    return res.status(403).json({ success: false, message: 'Token inválido.' });
  }
};

// Middleware de autorização
export const authorize = (roles) => {
  return (req, res, next) => {
    // Verifica se o usuário tem um cargo permitido
    if (!roles.includes(req.user.cargo)) {
      return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }

    // Permite que a requisição continue
    next();
  };
};
