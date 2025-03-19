// src/services/authService.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const usersRepository = require('../repository/usersRepository');
dotenv.config();

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, type: user.type },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

function authenticateUser(email, password) {
  const user = usersRepository.findByEmail(email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  if (user.password !== password) {
    throw new Error('Senha incorreta');
  }
  return user;
}

module.exports = { generateToken, authenticateUser };
