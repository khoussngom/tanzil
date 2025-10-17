const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
  console.log('Connecté à la base de données PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erreur de connexion à la base de données', err);
  process.exit(-1);
});

module.exports = pool;