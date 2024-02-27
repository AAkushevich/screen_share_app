// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'remote_controll_app_db',
  password: 'qwerty',
  port: 5432,
});

module.exports = pool;
