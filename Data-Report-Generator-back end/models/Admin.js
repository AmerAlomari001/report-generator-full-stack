const db = require("../db");
const { pool } = require("../db");

const AdminModel = {
  getAllUsers: async () => {
    const [rows] = await pool.query(`SELECT * FROM users`);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  },

  // ✅ حذف جميع تقارير هذا المستخدم
  deleteByUser: async (email) => {
    if (email) {
      await pool.query(`DELETE FROM reports WHERE email = ?`, [email]);
    }
  },

  // ✅ حذف المستخدم نفسه من جدول users
  deleteUserById: async (id) => {
    const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
    return result.affectedRows > 0; // يرجع true لو الحذف نجح
  },

  updateUserRole: async (id, role) => {
    return pool.query(`UPDATE users SET role = ? WHERE id = ?`, [role, id]);
  },

  getAllReportsWithUser: async () => {
    const [rows] = await pool.query(`
      SELECT * FROM reports
      ORDER BY created_at DESC
    `);
    return rows;
  },

  deleteReportById: async (id) => {
    return pool.query(`DELETE FROM reports WHERE id = ?`, [id]);
  }
};

module.exports = AdminModel;
