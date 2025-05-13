// backend/config/database.js
const mysql = require('mysql2/promise');

// Criação do pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2535', // ATENÇÃO: Senha em código é inseguro, use variáveis de ambiente
  database: 'safetruck',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão (opcional)
pool.getConnection()
  .then(connection => {
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    process.exit(1); // Encerra o aplicativo se não conseguir conectar
  });

// Exporte APENAS o pool
module.exports = pool;