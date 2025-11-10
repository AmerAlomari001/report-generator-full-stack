const AdminModel = require("../models/Admin.js");
const UserModel = require("../models/User");

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

  deleteUserById: async (userId, currentAdminEmail) => {
    const user = await UserModel.findById(userId);
    if (!user) {
      const e = new Error("User not found");
      e.statusCode = 404;
      throw e;
    }

    if (user.email === currentAdminEmail) {
      const e = new Error("Admin cannot delete their own account");
      e.statusCode = 403;
      throw e;
    }

    await AdminModel.deleteByUser(user.email);

    const deleted = await AdminModel.deleteUserById(userId);
    if (!deleted) {
      const e = new Error("Failed to delete user");
      e.statusCode = 500;
      throw e;
    }

    return true;
  },

 /* approveUser: async (id, isApproved) => {
    const user = await UserModel.findById(id);
    if (!user) {
      const e = new Error("User not found");
      e.statusCode = 404;
      throw e;
    }

    await AdminModel.updateUserApproval(id, isApproved);
    return { message: isApproved ? "User approved" : "User rejected" };
  },*/
};

module.exports = AdminService;
