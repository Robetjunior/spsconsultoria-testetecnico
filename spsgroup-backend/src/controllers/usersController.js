const { validationResult } = require('express-validator');
const userService = require('../services/userService');

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, email, type, password } = req.body;
  
  try {
    const newUser = userService.createUser({ name, email, type, password });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getUsers = (req, res) => {
  const users = userService.getUsers();
  console.log('Usuários encontrados:', users);
  return res.json(users);
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, type, password } = req.body;
  
  try {
    const updatedUser = userService.updateUser(id, { name, email, type, password });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  
  try {
    const removedUser = userService.deleteUser(id);
    if (!removedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.status(200).json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
