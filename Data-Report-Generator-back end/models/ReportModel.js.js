const { pool } = require("../db");

const ReportModel = {
createReport: async ({ prompt, report, filePath, pdfPath, email, chartData }) => {

    const [result] = await pool.query(
      `INSERT INTO reports (prompt, report, file_path, pdf_path, email, chart_data)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        prompt,
        report,        
        filePath,            
        pdfPath,             
        email,
        JSON.stringify(chartData) 
      ]
    );

    return result.insertId;
  },

  getReports: async (email) => {
    const [rows] = await pool.query(
      `SELECT * FROM reports WHERE email = ? ORDER BY created_at DESC`,
      [email]
    );
    return rows;
  },

  getReportById: async (id) => {
    const [rows] = await pool.query(`SELECT * FROM reports WHERE id = ?`, [id]);
    return rows[0];
  },

  deleteReport: async (id) => {
    const [result] = await pool.query(`DELETE FROM reports WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = ReportModel;
