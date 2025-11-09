const ReportService = require("../service/reportsservice");

const ReportController = {
  generateReport: async (req, res) => {
    try {
      const response = await ReportService.generateReport(req);
      res.json(response);
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
      const reports = await ReportService.getReportHistory(req.user.email);
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
      const userEmail = req.user.email;

      const message = await ReportService.deleteReport(id, userEmail);
      res.json({ message });
    } catch (err) {
      res.status(500).json({
        error: "Failed to delete report",
        detail: err.stack || err.message,
      });
    }
  },
};

module.exports = ReportController;
