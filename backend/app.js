
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api', require('./routes/api'));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rota padrão para o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

module.exports = app;