const FinancialRecord = require("../models/FinanceRec.js");

// ** total income, expenses, net balance **
const getSummary = async (req, res) => {
    try {
        const records = await FinancialRecord.find({ isDeleted: false });

        let totalIncome = 0;
        let totalExpenses = 0;

        for (let record of records) {
            if (record.type === "income") {
                totalIncome += record.amount;
            } else {
                totalExpenses += record.amount;
            }
        }

        const netBalance = totalIncome - totalExpenses;

        res.status(200).json({
        totalIncome,
        totalExpenses,
        netBalance,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ** Category(income, expense, etc.) wise Totals **
const getCategoryTotals = async (req, res) => {
    try {
        const records = await FinancialRecord.find({ isDeleted: false });

        const categoryTotals = {};

        for (let record of records) {
            const category = record.category;
            const amount = record.amount;

            // if category not seen before, start it from 0
            if (categoryTotals[category] === undefined) {
                categoryTotals[category] = 0;
            }

            // add amount to that category
            categoryTotals[category] = categoryTotals[category] + amount;
        }

        res.status(200).json(categoryTotals);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

// ** last 10 records **
const getRecentActivity = async (req, res) => {
    try {
        const records = await FinancialRecord.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("createdBy", "name email");

        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ** Monthly Data **
const getMonthlyTrends = async (req, res) => {
    try {
        const records = await FinancialRecord.find({ isDeleted: false });

        const monthlyData = {};

        for (let record of records) {
            const date = new Date(record.date);

            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 1 to 12

            // add 0 in front if single digit month → 1 becomes "01"
            let monthStr = "";
            if (month < 10) {
                monthStr = "0" + month;
            } else {
                monthStr = String(month);
            }

            const monthKey = year + "-" + monthStr;

            // if this month not seen before, start income and expenses from 0
            if (monthlyData[monthKey] === undefined) {
                monthlyData[monthKey] = { income: 0, expenses: 0 };
            }

            // add amount to correct type
            if (record.type === "income") {
                monthlyData[monthKey].income =
                monthlyData[monthKey].income + record.amount;
            }

            if (record.type === "expense") {
                monthlyData[monthKey].expenses =
                monthlyData[monthKey].expenses + record.amount;
            }
        }

        res.status(200).json(monthlyData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getSummary,
    getCategoryTotals,
    getRecentActivity,
    getMonthlyTrends,
};
