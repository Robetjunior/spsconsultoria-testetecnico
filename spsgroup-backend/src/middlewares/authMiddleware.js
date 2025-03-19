const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }
  
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  });
};
