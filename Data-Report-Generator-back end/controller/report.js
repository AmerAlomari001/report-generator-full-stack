const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");

const ReportModel = require("../models/ReportModel.js");
require("dotenv").config();
const axios = require("axios");

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
    return {
      chartTitle: "No data available",
      chartData: []
    };
  }

  let columns = Object.keys(fileData[0]);

  columns = columns.filter(col => !col.startsWith("__EMPTY"));

  const ignoredCols = ["id", "_id", "age", "score", "file_path", "pdf_path", "report"];
  const candidateCols = columns.filter(col => !ignoredCols.includes(col));

  let selectedCol = null;

  for (const col of candidateCols) {
    const values = fileData.map(row => row[col]).filter(v => v !== undefined && v !== null && v !== "");
    const unique = new Set(values);

    if (unique.size > 1 && unique.size <= fileData.length / 2) {
      selectedCol = col;
      break;
    }
  }

  if (!selectedCol) {
    selectedCol = candidateCols.find(c => typeof fileData[0][c] === "string") || "Unknown";
  }

  const counts = {};
  fileData.forEach(row => {
    let label = row[selectedCol];
    if (!label || label === "") label = "Unknown";
    counts[label] = (counts[label] || 0) + 1;
  });

  const chartData = Object.entries(counts).map(([label, value]) => ({
    label,
    value
  }));

  return {
    chartTitle: `Records grouped by ${selectedCol}`,
    chartData
  };
}




async function sendToGemini(prompt) {
  const MODEL = "gemini-2.5-flash"; 
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error("❌ Missing GEMINI_API_KEY in .env file");
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!aiText) throw new Error("Empty AI response");

    return aiText.trim();
  } catch (err) {
    console.error("🔥 Gemini API error:", err.response?.data || err.message);
    throw new Error("Failed to get AI response from Gemini API");
  }
}

const PDF_DIR = path.join(process.cwd(), "reports");
const FONTS_DIR = path.join(process.cwd(), "fonts");
const ROBOTO_REG = path.join(FONTS_DIR, "Roboto-Regular.ttf");
const ROBOTO_BOLD = path.join(FONTS_DIR, "Roboto-Bold.ttf");

const COLORS = {
  text: "#111111",
  subtext: "#666666",
  rule: "#DDDDDD",
  bullet: "#333333",
  h1: "#111111",
  h2: "#111111",
  h3: "#111111",
};







function createPDF(markdownText, title = "Generated Report") {
  return new Promise((resolve, reject) => {
    try {
      const pdfDir = path.join(process.cwd(), "reports");
      if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

      const pdfPath = path.join(pdfDir, `${Date.now()}-report.pdf`);

      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);


      doc.registerFont("Roboto", path.join(__dirname, "../fonts/Roboto_SemiCondensed-Regular.ttf"));
      doc.registerFont("Roboto-Bold", path.join(__dirname, "../fonts/Roboto_Condensed-Bold.ttf"));

      doc.font("Roboto-Bold").fontSize(22).text(title, { align: "center" }).moveDown(1);

      const lines = markdownText.split("\n");

      lines.forEach(line => {
        line = line.trim();

        if (line.startsWith("### ")) {
          doc.moveDown(0.6);
          doc.font("Roboto-Bold").fontSize(16).text(line.replace("### ", ""));
          doc.moveDown(0.2);
          return;
        }

        if (line.includes("**")) {
          const noStars = line.replace(/\*\*(.*?)\*\*/g, "$1");
          doc.font("Roboto-Bold").fontSize(12).text(noStars, { lineGap: 4 });
          return;
        }

        if (line.startsWith("* ")) {
          doc.font("Roboto").fontSize(12).text("• " + line.replace("* ", ""), { indent: 20, lineGap: 4 });
          return;
        }

        if (line === "") {
          doc.moveDown(0.4);
          return;
        }

        doc.font("Roboto").fontSize(12).text(line, { lineGap: 4 });
      });

      doc.moveDown(2);
      doc.font("Roboto").fontSize(9).fillColor("#555")
        .text(`Generated on: ${new Date().toLocaleString()}`, { align: "right" });

      doc.end();

      stream.on("finish", () => resolve(pdfPath));
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
}





// --------------------- Controller ---------------------
const ReportController = {
  generateReport: async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "File missing" });

      const userPrompt = req.body.prompt || "";
      const fileExt = path.extname(req.file.originalname).toLowerCase();
      let fileData = [];

      if (fileExt === ".csv") {
        fileData = await parseCsv(req.file.path);
      } else if (fileExt === ".xlsx" || fileExt === ".xls") {
        fileData = await parseXlsx(req.file.path);
      } else {
        return res.status(400).json({ error: "Unsupported file format. Please upload CSV or Excel (.xlsx)" });
      }

      const jsonData = JSON.stringify(fileData, null, 2);
const chartSummary = buildChartSummary(fileData);

     const finalPrompt = `${userPrompt}

Here is the uploaded dataset (as JSON):

${jsonData}

Please generate the response in clean **Markdown format**, including:

### 1. Summary  
### 2. Unique values  
### 3. Errors or issues  
### 4. Insights

Use proper markdown formatting:  
- Use **bold**, lists (*), headings (###), and spacing  
- Do NOT wrap the response inside code blocks like \`\`\`

Return ONLY markdown text.
`;


      const reportText = await sendToGemini(finalPrompt);
      const pdfPath = await createPDF(reportText);
      console.log("📝 First row of fileData:", fileData[0]);

      const userEmail = req.user.email;

     const pdfUrl = `/downloads/${path.basename(pdfPath)}`;


const id = await ReportModel.createReport({
  prompt: userPrompt,
  reportText,
  filePath: req.file.path,
  pdfPath: pdfUrl,  
  email: userEmail,
  chartData: chartSummary, 
});


      return res.json({
        id,
        message: "Report generated successfully",
        pdfUrl: `/downloads/${path.basename(pdfPath)}`,
      });
    } catch (err) {
      console.error("❌ Error in generateReport:", err);
      res.status(500).json({
        error: "Report generation failed",
        detail: err.stack || err.message,
      });
    }
  },
getReportHistory: async (req, res) => {
  try {
    const email = req.user.email;
    const reports = await ReportModel.getReports(email);
    res.json(reports);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch reports",
      detail: err.stack || err.message,
    });
  }
},
 
  deleteReport: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ReportModel.deleteReport(id);

      return res.json({ message: "Report deleted successfully" });
    } catch (err) {
      console.error("❌ Error in deleteReport:", err);
      res.status(500).json({
        error: "Failed to delete report",
        detail: err.stack || err.message,
      });
    }
  }
};

module.exports = ReportController;
