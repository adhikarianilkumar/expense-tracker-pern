const Pool = require("pg").Pool;
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

module.exports = pool;
