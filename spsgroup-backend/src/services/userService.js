const { v4: uuidv4 } = require('uuid');
const usersRepository = require('../repository/usersRepository');

function createUser({ name, email, type, password }) {
  if (usersRepository.findByEmail(email)) {
    throw new Error('Email já cadastrado');
  }
  const now = new Date().toISOString();
  const newUser = {
    id: uuidv4(),
    name,
    email,
    type,
    password,
    created_at: now,
    updated_at: now,
  };
  usersRepository.addUser(newUser);
  return newUser;
}

function getUsers() {
  return usersRepository.getUsers();
}

function updateUser(id, { name, email, type, password }) {
  const user = usersRepository.findById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  if (email && email !== user.email && usersRepository.findByEmail(email)) {
    throw new Error('Email já cadastrado');
  }
  return usersRepository.updateUser(id, { name, email, type, password });
}

function deleteUser(id) {
  const user = usersRepository.findById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  return usersRepository.removeUser(id);
}

module.exports = { createUser, getUsers, updateUser, deleteUser };
