const { Pool } = require("pg");
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});

// Programmatic Connection
const programmaticConnection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: process.env.DB_MAX_CONNECTIONS
};

// Using Programmatic Connection
// console.log(`Database Connecting...`.cyan.underline.bold,`
// Database Host: ${programmaticConnection.host}
// Database User: ${programmaticConnection.user}
// Database Port: ${programmaticConnection.port}
// Database Name: ${programmaticConnection.database}
// `);
// const pool = new Pool(programmaticConnection);

// Connection URI
const connectionUri = {
  connectionString: process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_DB_CONNECTION_URI : process.env.PRODUCTION_DB_CONNECTION_URI
};
// Using Connection URI
console.log(`Database Connecting \nConnection URI ${connectionUri.connectionString}`.cyan.underline.bold);
const pool = new Pool(connectionUri);

console.log(`Database Connected!`.cyan.underline.bold);

module.exports = pool;
