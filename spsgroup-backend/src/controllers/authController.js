// src/controllers/authController.js
const { validationResult } = require('express-validator');
const authService = require('../services/authService');

exports.authenticate = (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = authService.authenticateUser(email, password);
    const token = authService.generateToken(user);
    return res.json({ token });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
