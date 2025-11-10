const AdminService = require("../service/adminService");

const AdminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await AdminService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users", detail: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const currentAdminEmail = req.user.email;

      await AdminService.deleteUserById(id, currentAdminEmail);
      res.json({ message: "User and their reports deleted successfully" });
    } catch (err) {
      console.error("❌ deleteUser error:", err);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  },

  approveUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { isApproved } = req.body;

      await AdminService.approveUser(id, isApproved);
      res.json({ message: isApproved ? "✅ User approved successfully" : "❌ User rejected" });
    } catch (error) {
      console.error("❌ approveUser error:", error);
      res.status(500).json({ error: "Failed to update approval", detail: error.message });
    }
  },

  updateUserRole: async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    try {
      await AdminService.updateUserRole(id, role);
      res.json({ message: `User role updated to ${role}` });
    } catch (error) {
      res.status(500).json({ error: "Failed to update role", detail: error.message });
    }
  },

  getAllReports: async (req, res) => {
    try {
      const reports = await AdminService.getAllReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reports", detail: error.message });
    }
  },

  deleteReport: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await AdminService.deleteReport(id);
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json({ message: "Report deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete report", detail: error.message });
    }
  },
};

module.exports = AdminController;
