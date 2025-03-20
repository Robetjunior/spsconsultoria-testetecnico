const { body, validationResult } = require('express-validator');

const validateUserCreation = [
  body('name')
    .notEmpty().withMessage('O nome é obrigatório.'),
  body('email')
    .isEmail().withMessage('Informe um email válido.'),
  body('type')
    .notEmpty().withMessage('O tipo é obrigatório.'),
  body('password')
    .notEmpty().withMessage('A senha é obrigatória.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Retorna um erro 400 com a lista de erros
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateUserCreation };
