const { v4: uuidv4 } = require('uuid');

let users = [];

// Usuário admin previamente cadastrado
users.push({
  id: uuidv4(),
  name: 'admin',
  email: 'admin@spsgroup.com.br',
  type: 'admin',
  password: '1234'
});

module.exports = {
  /**
   * Retorna uma cópia do array de usuários para evitar modificações externas.
   */
  getUsers: () => [...users],

  /**
   * Adiciona um novo usuário.
   * @param {Object} user - Objeto de usuário.
   */
  addUser: (user) => {
    // Você pode adicionar validações aqui se necessário.
    users.push(user);
  },

  /**
   * Procura um usuário pelo email.
   * @param {string} email - Email do usuário.
   * @returns {Object | undefined}
   */
  findByEmail: (email) => users.find(u => u.email === email),

  /**
   * Procura um usuário pelo id.
   * @param {string} id - ID do usuário.
   * @returns {Object | undefined}
   */
  findById: (id) => users.find(u => u.id === id),

  /**
   * Atualiza os dados de um usuário com base no id.
   * @param {string} id - ID do usuário.
   * @param {Object} userData - Dados para atualizar.
   * @returns {Object | null} - Usuário atualizado ou null se não encontrado.
   */
  updateUser: (id, userData) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      return users[index];
    }
    return null;
  },

  /**
   * Remove um usuário pelo id.
   * @param {string} id - ID do usuário.
   * @returns {Object | null} - Usuário removido ou null se não encontrado.
   */
  removeUser: (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      // Retorna o usuário removido (primeiro elemento do array retornado pelo splice)
      return users.splice(index, 1)[0];
    }
    return null;
  }
};
