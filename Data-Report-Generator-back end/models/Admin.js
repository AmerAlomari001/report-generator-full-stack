const db = require("../db");

const AdminModel = {
  getAllUsers: async () => {
    const [rows] = await db.pool.query(`
      SELECT * FROM users
    `);
    return rows;
  },

  updateUserRole: async (id, role) => {
    return db.pool.query(
      `UPDATE users SET role = ? WHERE id = ?`,
      [role, id]
    );
  },

 getAllReportsWithUser: async () => {
  const [rows] = await db.pool.query(`
    SELECT 
      *
    FROM reports
    ORDER BY reports.created_at DESC
  `);
  return rows;
},
deleteReportById: async (id) => {
  return db.pool.query(
    `DELETE FROM reports WHERE id = ?`,
    [id]
  );
}
}
module.exports=AdminModel;
