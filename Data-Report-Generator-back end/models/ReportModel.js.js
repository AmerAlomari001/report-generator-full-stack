const { pool } = require("../db");

const ReportModel = {
async createReport({ prompt, reportText, filePath, pdfPath, email }) {
  const query = `
    INSERT INTO reports (prompt, report, file_path, pdf_path, email)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [prompt, reportText, filePath, pdfPath, email]);
  return result.insertId;
},

 getReportsByEmail: async (email) => {
    const [rows] = await pool.query(
      `SELECT *
       FROM reports
       WHERE email = ?
       ORDER BY created_at DESC`,
      [email]
    );
    return rows;
  
},
  async getReports(email) {
    const [rows] = await pool.query(
      `SELECT * FROM reports WHERE email = ? ORDER BY created_at DESC`,
      [email]
    );
    return rows;
  },




async deleteReport(id) {
  const [rows] = await pool.query(
    "SELECT * FROM reports WHERE id = ? ",
    [id]
  );
  

  await pool.query("DELETE FROM reports WHERE id = ?", [id]);

  return true; 
}


};

module.exports = ReportModel;
