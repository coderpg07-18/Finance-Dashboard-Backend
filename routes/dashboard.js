const express = require("express");
const router = express.Router();

const {
  getSummary,
  getCategoryTotals,
  getRecentActivity,
  getMonthlyTrends,
} = require("../controllers/dashboard.js");

const { isLoggedIn } = require("../middleware/auth.js");
const { isAnalystOrAdmin } = require("../middleware/rbac.js");


// all dashboard routes → analyst and admin only
router.get("/summary", isLoggedIn, isAnalystOrAdmin, getSummary);
router.get("/categories", isLoggedIn, isAnalystOrAdmin, getCategoryTotals);
router.get("/recent", isLoggedIn, isAnalystOrAdmin, getRecentActivity);
router.get("/trends", isLoggedIn, isAnalystOrAdmin, getMonthlyTrends);

module.exports = router;
