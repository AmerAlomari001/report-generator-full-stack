const express = require("express");
const router = express.Router();

const authenticateToken = require("../middelware/auth");
const adminOnly = require("../middelware/adminOnly");

const AdminController = require("../controller/admincontroller");

router.get("/users", authenticateToken, adminOnly, AdminController.getAllUsers);

router.patch("/users/role/:id", authenticateToken, adminOnly, AdminController.updateUserRole);

router.patch("/users/approve/:id", authenticateToken, adminOnly, AdminController.approveUser);

router.get("/reports", authenticateToken, adminOnly, AdminController.getAllReports);

router.delete("/reports/:id", authenticateToken, adminOnly, AdminController.deleteReport);

router.delete("/users/:id", authenticateToken, adminOnly, AdminController.deleteUser);
router.patch("/users/:id/approve", authenticateToken, adminOnly, AdminController.approveUser);


module.exports = router;
