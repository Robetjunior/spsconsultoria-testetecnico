
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/login', 
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  authController.authenticate
);

module.exports = router;
