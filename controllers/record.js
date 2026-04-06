const FinancialRecord = require("../models/FinanceRec");

// ** CREATE RECORD **
const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await FinancialRecord.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Record created successfully", record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** GET ALL RECORDS **
const getAllRecords = async (req, res) => {
  try {
    const filter = { isDeleted: false };

    // filter by type (income / expense)
    if (req.query.type) {
      filter.type = req.query.type;
    }

    // filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // filter by date range
    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const records = await FinancialRecord.find(filter).populate("createdBy", "name email");

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** GET SINGLE RECORD **
const getRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findById(req.params.id).populate("createdBy", "name email");

    if (!record || record.isDeleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** UPDATE RECORD **
const updateRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record updated", record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** SOFT DELETE RECORD **
const deleteRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // mark as deleted instead of removing from DB
    record.isDeleted = true;
    await record.save();

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
};