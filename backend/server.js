// backend/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const pool = require('./config/database'); // Importa o pool configurado
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, '..', 'frontend', 'public');
app.use(express.static(publicPath));

// Rotas
const userRoutes = require('./routes/api');
app.use('/api', userRoutes);

// Rota de teste do servidor
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'API SafeTruck está funcionando',
    database: pool ? 'conectado' : 'desconectado'
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro global:', err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Inicia o servidor após verificar a conexão com o MySQL
async function startServer() {
  try {
    // Testa a conexão com o MySQL
    const connection = await pool.getConnection();
    console.log('✅ MySQL conectado com sucesso!');
    connection.release();

    // Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`🔗 Acesse: http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Falha ao conectar ao MySQL:', err.message);
    process.exit(1); // Encerra o processo com erro
  }
}

// Inicia a aplicação
startServer();