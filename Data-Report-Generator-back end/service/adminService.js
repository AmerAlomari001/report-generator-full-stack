const AdminModel = require("../models/Admin");
const AdminService = {
  getAllUsers: async () => {
    return AdminModel.getAllUsers();
  },

  updateUserRole: async (id, role) => {
    return AdminModel.updateUserRole(id, role);
  },

  getAllReports: async () => {
    return AdminModel.getAllReportsWithUser();
  },

  deleteReport: async (id) => {
    return AdminModel.deleteReportById(id);
  },
};

module.exports = AdminService;