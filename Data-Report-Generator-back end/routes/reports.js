const express = require("express");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middelware/auth.js");

const ReportController = require("../controller/reportcontrooler.js");

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post("/generate",authenticateToken,upload.single("file"), ReportController.generateReport);
router.get("/history", authenticateToken, ReportController.getReportHistory);
router.delete("/:id",authenticateToken,ReportController.deleteReport);
module.exports = router;
