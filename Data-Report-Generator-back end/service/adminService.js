const AdminModel = require("../models/Admin.js");
const UserModel = require("../models/User"); // ✅ تأكد أن الاسم صحيح
const ReportModel = require("../models/ReportModel.js"); // ✅ مودل التقارير

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
  // 🔍 احضر المستخدم حسب ID
  const user = await UserModel.findById(userId);
  if (!user) {
    const e = new Error("User not found");
    e.statusCode = 404;
    throw e;
  }

  // 🚫 منع الأدمن من حذف نفسه
  if (user.email === currentAdminEmail) {
    const e = new Error("Admin cannot delete their own account");
    e.statusCode = 403;
    throw e;
  }

  // 🧹 حذف تقارير المستخدم
  await AdminModel.deleteByUser(user.email);

  // ❌ حذف المستخدم من جدول users
  const deleted = await AdminModel.deleteUserById(userId);
  if (!deleted) {
    const e = new Error("Failed to delete user");
    e.statusCode = 500;
    throw e;
  }

  return true;
},
};

module.exports = AdminService;
