const { pool } = require("../db");
const bcrypt = require("bcryptjs");

const UserModel = {
  createUser: async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );

    return result.insertId;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    return rows[0]; // بترجع أول نتيجة (إن وجدت)
  },
};

module.exports = UserModel;
