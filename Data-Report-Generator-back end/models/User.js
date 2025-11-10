const { pool } = require("../db");
const bcrypt = require("bcryptjs");

const UserModel = {
  createUser: async ({ username, email, password, role }) => {
    const [result] = await pool.query(
      `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
      [username, email, password, role]
    );
    return result.insertId;
  },

  deleteuserById: async (id) => {
    const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  }
};

module.exports = UserModel;
