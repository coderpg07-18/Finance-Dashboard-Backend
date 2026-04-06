const express = require("express");
const router = express.Router();

const {
  getSummary,
  getCategoryTotals,
  getRecentRecords
} = require("../controllers/dashboard.js");

const { isLoggedIn } = require("../middleware/auth.js");
const { isAnalystOrAdmin } = require("../middleware/rbac.js");


// analyst + admin only
router.get("/summary", isLoggedIn, isAnalystOrAdmin, getSummary);
router.get("/categories", isLoggedIn, isAnalystOrAdmin, getCategoryTotals);
router.get("/recent", isLoggedIn, isAnalystOrAdmin, getRecentRecords);

module.exports = router;