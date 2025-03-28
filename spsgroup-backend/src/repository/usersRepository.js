const { v4: uuidv4 } = require('uuid');

let users = [];

const now = new Date().toISOString();

users.push({
  id: uuidv4(),
  name: 'admin',
  email: 'admin@spsgroup.com.br',
  type: 'admin',
  password: '1234',
  created_at: now,
  updated_at: now,
});

// Adicionando 10 usuários fictícios
const fakeUsers = [
  { name: 'João Silva', email: 'joao.silva@spsgroup.com.br', type: 'user' },
  { name: 'Maria Souza', email: 'maria.souza@spsgroup.com.br', type: 'user' },
  { name: 'Carlos Pereira', email: 'carlos.pereira@spsgroup.com.br', type: 'user' },
  { name: 'Ana Oliveira', email: 'ana.oliveira@spsgroup.com.br', type: 'user' },
  { name: 'Rafael Costa', email: 'rafael.costa@spsgroup.com.br', type: 'user' },
  { name: 'Julia Mendes', email: 'julia.mendes@spsgroup.com.br', type: 'user' },
  { name: 'Fernando Lima', email: 'fernando.lima@spsgroup.com.br', type: 'user' },
  { name: 'Larissa Martins', email: 'larissa.martins@spsgroup.com.br', type: 'user' },
  { name: 'Gustavo Araujo', email: 'gustavo.araujo@spsgroup.com.br', type: 'user' },
  { name: 'Paula Ribeiro', email: 'paula.ribeiro@spsgroup.com.br', type: 'user' },
];

fakeUsers.forEach(user => {
  users.push({
    id: uuidv4(),
    name: user.name,
    email: user.email,
    type: user.type,
    password: '1234',
    created_at: now,
    updated_at: now,
  });
});

/**
 * Retorna uma cópia do array de usuários.
 * @returns {Array} - Lista de usuários.
 */
function getUsers() {
  console.log('Retornando usuários:', users);
  return [...users];
}

/**
 * Adiciona um novo usuário e define os campos created_at e updated_at.
 * @param {Object} user - Objeto de usuário.
 */
function addUser(user) {
  users.push(user);
}

/**
 * Procura um usuário pelo email.
 * @param {string} email - Email do usuário.
 * @returns {Object | undefined}
 */
function findByEmail(email) {
  return users.find(u => u.email === email);
}

/**
 * Procura um usuário pelo id.
 * @param {string} id - ID do usuário.
 * @returns {Object | undefined}
 */
function findById(id) {
  return users.find(u => u.id === id);
}

/**
 * Atualiza os dados de um usuário, preservando o created_at e atualizando o updated_at.
 * @param {string} id - ID do usuário.
 * @param {Object} userData - Dados para atualizar.
 * @returns {Object | null} - Usuário atualizado ou null se não encontrado.
 */
function updateUser(id, userData) {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
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
 * @returns {Object | null} - Usuário removido ou null se não encontrado.
 */
function removeUser(id) {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  getUsers,
  addUser,
  findByEmail,
  findById,
  updateUser,
  removeUser,
};
