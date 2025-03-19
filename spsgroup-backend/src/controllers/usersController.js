const { v4: uuidv4 } = require('uuid');

let users = [];

// Define o timestamp atual
const now = new Date().toISOString();

// Usuário admin previamente cadastrado com created_at e updated_at
users.push({
  id: uuidv4(),
  name: 'admin',
  email: 'admin@spsgroup.com.br',
  type: 'admin',
  password: '1234',
  created_at: now,
  updated_at: now,
});

/**
 * Cria um novo usuário e adiciona os campos created_at e updated_at.
 * @param {Object} userData - Dados do usuário.
 * @returns {Object} - Novo usuário criado.
 */
function createUser(userData) {
  const now = new Date().toISOString();
  const newUser = {
    id: uuidv4(),
    ...userData,
    created_at: now,
    updated_at: now,
  };
  users.push(newUser);
  return newUser;
}

/**
 * Retorna uma cópia do array de usuários.
 * @returns {Array} - Lista de usuários.
 */
function getUsers() {
  return [...users];
}

/**
 * Atualiza os dados de um usuário e atualiza o campo updated_at.
 * @param {string} id - ID do usuário.
 * @param {Object} userData - Dados para atualizar.
 * @returns {Object|null} - Usuário atualizado ou null se não encontrado.
 */
function updateUser(id, userData) {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    // Preserva o created_at e atualiza o updated_at
    users[index] = {
      ...users[index],
      ...userData,
      updated_at: new Date().toISOString(),
    };
    return users[index];
  }
  return null;
}

/**
 * Remove um usuário pelo id.
 * @param {string} id - ID do usuário.
 * @returns {Object|null} - Usuário removido ou null se não encontrado.
 */
function deleteUser(id) {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
}

/**
 * Busca um usuário pelo email.
 * @param {string} email - Email do usuário.
 * @returns {Object|undefined} - Usuário encontrado ou undefined.
 */
function findByEmail(email) {
  return users.find(u => u.email === email);
}

/**
 * Busca um usuário pelo id.
 * @param {string} id - ID do usuário.
 * @returns {Object|undefined} - Usuário encontrado ou undefined.
 */
function findById(id) {
  return users.find(u => u.id === id);
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  findByEmail,
  findById,
};
