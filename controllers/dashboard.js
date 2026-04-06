const FinancialRecord = require("../models/FinanceRec");

// ** DASHBOARD SUMMARY **
const getSummary = async (req, res) => {
  try {
    const records = await FinancialRecord.find({ isDeleted: false });

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((record) => {
      if (record.type === "income") {
        totalIncome += record.amount;
      } else if (record.type === "expense") {
        totalExpense += record.amount;
      }
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ** CATEGORY TOTALS **
const getCategoryTotals = async (req, res) => {
  try {
    const records = await FinancialRecord.find({ isDeleted: false });

    const categories = {};

    records.forEach((record) => {
      if (!categories[record.category]) {
        categories[record.category] = 0;
      }

      categories[record.category] += record.amount;
    });

    res.json(categories);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ** RECENT ACTIVITY **
const getRecentRecords = async (req, res) => {
  try {
    const records = await FinancialRecord
      .find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getSummary,
  getCategoryTotals,
  getRecentRecords
};