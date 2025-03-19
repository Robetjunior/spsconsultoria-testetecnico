const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateUserCreation } = require('../middlewares/userValidator');

// Aplica o middleware de autenticação para todas as rotas abaixo
router.use(authMiddleware);

// Rota para criar um novo usuário com validação
router.post('/', validateUserCreation, usersController.createUser);

// Rota para listar todos os usuários
router.get('/', usersController.getUsers);

// Rota para atualizar um usuário (você pode criar outro validador específico se necessário)
router.put('/:id', usersController.updateUser);

// Rota para remover um usuário
router.delete('/:id', usersController.deleteUser);

module.exports = router;
