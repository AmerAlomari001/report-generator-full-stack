const mysql = require('mysql2/promise');
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ success connection database");
    connection.release(); 
  } catch (error) {
    console.error("❌ فشل الاتصال بقاعدة البيانات:", error.message);
  }
};

module.exports = { pool, testConnection };
