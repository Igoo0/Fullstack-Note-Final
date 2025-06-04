import { Sequelize } from "sequelize";
import dotenv from "dotenv"; //untuk menyembunyikan data berharga

dotenv.config();//ngekonfigurasi data dari file.env


// Database connection optimized for local development
const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // Move acquireTimeout here
    idle: 10000
  },
  dialectOptions: {
    // Remove SSL completely for localhost
    connectTimeout: 60000,
    // Remove acquireTimeout and timeout from here - they don't belong in dialectOptions
  },
  logging: console.log,
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/
    ],
    max: 3
  }
});

// Test the connection
const testConnection = async () => {
  try {
    await db.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};
