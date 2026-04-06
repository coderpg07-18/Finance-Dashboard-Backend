const express = require("express");
const router = express.Router();

const {
  createRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/record.js");

const { isLoggedIn } = require("../middleware/auth.js");
const { isAdmin } = require("../middleware/rbac.js");


// anyone logged in can view records
router.get("/", isLoggedIn, getAllRecords);
router.get("/:id", isLoggedIn, getRecord);

// only admin can create, update, delete
router.post("/", isLoggedIn, isAdmin, createRecord);
router.put("/:id", isLoggedIn, isAdmin, updateRecord);
router.delete("/:id", isLoggedIn, isAdmin, deleteRecord);


module.exports = router;