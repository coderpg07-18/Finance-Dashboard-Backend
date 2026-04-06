const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
} = require("../controllers/user.js");

const { isLoggedIn } = require("../middleware/auth.js");
const { isAdmin } = require("../middleware/rbac.js");


// all routes here are admin only
router.get("/", isLoggedIn, isAdmin, getAllUsers);
router.get("/:id", isLoggedIn, isAdmin, getUser);
router.patch("/:id/role", isLoggedIn, isAdmin, updateUserRole);
router.patch("/:id/status", isLoggedIn, isAdmin, toggleUserStatus);
router.delete("/:id", isLoggedIn, isAdmin, deleteUser);


module.exports = router;