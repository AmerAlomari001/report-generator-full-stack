const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");
const axios = require("axios");

const ReportModel = require("../models/ReportModel.js");
require("dotenv").config();

function parseCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

function parseXlsx(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

function buildChartSummary(fileData) {
  if (!fileData || !fileData.length) {
    return { chartTitle: "No data available", chartData: [] };
  }

  let columns = Object.keys(fileData[0]).filter((col) => !col.startsWith("__EMPTY"));
  const ignoredCols = ["id", "_id", "score", "file_path", "pdf_path", "report"];
  const candidateCols = columns.filter((col) => !ignoredCols.includes(col));

  let selectedCol = candidateCols.find(
    (col) => new Set(fileData.map((row) => row[col])).size > 1
  );

  if (!selectedCol) selectedCol = candidateCols[0] || "Unknown";

  const counts = {};
  fileData.forEach((row) => {
    let label = row[selectedCol] || "Unknown";
    counts[label] = (counts[label] || 0) + 1;
  });

  const chartData = Object.entries(counts).map(([label, value]) => ({ label, value }));

  return {
    chartTitle: `Records grouped by ${selectedCol}`,
    chartData,
  };
}

async function sendToGemini(prompt) {
  const MODEL = "gemini-2.5-flash";
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) throw new Error("❌ Missing GEMINI_API_KEY in .env file");

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return aiText.trim();
  } catch (err) {
    console.error("🔥 Gemini API error:", err.response?.data || err.message);
    throw new Error("Failed to get AI response from Gemini API");
  }
}

function createPDF(markdownText, title = "Generated Report") {
  return new Promise((resolve, reject) => {
    try {
      const pdfPath = path.join(process.cwd(), "reports", `${Date.now()}-report.pdf`);
      const doc = new PDFDocument({ size: "A4", margins: 50 });
      const stream = fs.createWriteStream(pdfPath);

      doc.pipe(stream);
      doc.fontSize(22).text(title, { align: "center" }).moveDown();
      markdownText.split("\n").forEach((line) => doc.fontSize(12).text(line));
      doc.end();

      stream.on("finish", () => resolve(pdfPath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
}

const ReportService = {
  generateReport: async (req) => {
    const userPrompt = req.body.prompt || "";
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    let fileData = [];

    if (fileExt === ".csv") {
      fileData = await parseCsv(req.file.path);
    } else if (fileExt === ".xlsx" || fileExt === ".xls") {
      fileData = await parseXlsx(req.file.path);
    } else {
      throw new Error("Unsupported file format. Please upload CSV or Excel (.xlsx)");
    }

    const jsonData = JSON.stringify(fileData, null, 2);
    const chartSummary = buildChartSummary(fileData);

    const finalPrompt = `
${userPrompt}

Here is the uploaded dataset (in JSON format):
${jsonData}

Return the response in **Markdown format**, only.
`;

    const aiText = await sendToGemini(finalPrompt);
    const pdfPath = await createPDF(aiText);

    const pdfUrl = `/downloads/${path.basename(pdfPath)}`;
    const id = await ReportModel.createReport({
      prompt: userPrompt,
      report: aiText,
      filePath: req.file.path,
      pdfPath: pdfUrl,
      email: req.user.email,
      chartData: chartSummary,
    });

    return { id, message: "Report generated successfully", pdfUrl };
  },

  getReportHistory: async (email) => {
    return ReportModel.getReports(email);
  },
 getReportById: async (id) => {
    const report = await ReportModel.getReportById(id);
    if (!report) {
      throw new Error("Report not found");
    }
    return report;
  },
  deleteReport: async (id, userEmail) => {
    const report = await ReportModel.getReportById(id);
    if (!report) throw new Error("Report not found");
    if (report.email !== userEmail) throw new Error("Unauthorized to delete this report");

    await ReportModel.deleteReport(id);
    return "Report deleted successfully";
  },
};

module.exports = ReportService;
