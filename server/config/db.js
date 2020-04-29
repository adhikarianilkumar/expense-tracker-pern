const { Pool } = require("pg");
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: process.env.DB_MAX_CONNECTIONS
});
console.log(`Database Connected!`.cyan.underline.bold);

module.exports = pool;
