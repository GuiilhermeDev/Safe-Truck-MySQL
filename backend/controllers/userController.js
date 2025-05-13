const UserService = require('../services/userService');
const bcrypt = require('bcryptjs');
const pool = require('../config/database'); // Importe o pool corretamente

// Cadastro de usuário (POST)
exports.registerUser = async (req, res) => {
  try {
    // Cria novo usuário
    const userId = await await UserService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      userId
    });

  } catch (error) {
    handleError(res, error);
  }
};

// Consulta de usuário por ID (GET)
exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);

    res.json({
      success: true,
      user
    });
  } catch (error) {
    handleError(res, error, error.message.includes('não encontrado') ? 404 : 500);
  }
};

// Consulta de usuário (GET)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    res.json({
      success: true,
      users
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Helper para respostas de erro
const handleError = (res, error, statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Erro interno no servidor'
  });
};