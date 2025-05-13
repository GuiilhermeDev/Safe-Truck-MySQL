const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Rota de consulta by id (GET)
router.get('/users/:id', userController.getUserById);

// Rota de consulta all (GET)
router.get('/users', userController.getAllUsers);

// Rota de cadastro (POST)
router.post('/users', userController.registerUser);


module.exports = router;