const { pool } = require("../db");

const ReportModel = {

async createReport({ prompt, reportText, filePath, pdfPath, email,chartData  }) {
  const query = `
    INSERT INTO reports (prompt, report, file_path, pdf_path, email,chart_data)
    VALUES (?, ?, ?, ?, ?,?)
  `;
  const [result] = await pool.query(query, [prompt, reportText, filePath, pdfPath, email,JSON.stringify(chartData)]) //]);
  return result.insertId;
},
async getReportById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM reports WHERE id = ?",
    [id]
  );

  if (!rows.length) return null;

  return {
    ...rows[0],
    chartData: typeof rows[0].chart_data === "string" 
      ? JSON.parse(rows[0].chart_data) 
      : rows[0].chart_data
  };
},

 async getReports(email) {
  const [rows] = await pool.query(
    `SELECT * FROM reports WHERE email = ? ORDER BY created_at DESC`,
    [email]
  );
  
  return rows.map(row => ({
    ...row,
    chartData: typeof row.chart_data === "string"
      ? JSON.parse(row.chart_data)
      : row.chart_data,
  }));
},


 async deleteReport(id) {
    await pool.query("DELETE FROM reports WHERE id = ?", [id]);
    return true;
  }




};


module.exports = ReportModel;
