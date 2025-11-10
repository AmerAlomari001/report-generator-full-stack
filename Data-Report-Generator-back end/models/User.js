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
  
  deleteuserById: async (id) => {
    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0; // true لو انحذف، false لو ما لقى المستخدم
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    return rows[0]; // بترجع أول نتيجة (إن وجدت)
  },
  findById: async (id) => {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return rows[0]; // يرجع أول سجل، أو undefined لو ما لقى إشي
  },
};

module.exports = UserModel;
