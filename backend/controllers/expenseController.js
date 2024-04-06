const express = require("express");
const router = express.Router();
const Expense = require("./../models/expenseModel.js");

// GET route to fetch all expenses
// GET /api/v1/expenses
exports.getAllExpenses = (req, res, next) => {
  console.log(req.user);
  const userId = req.user.userId;
  Expense.find({ userId })
    .then((expenses) =>
      res.status(200).json({ userId, success: true, expenses })
    )
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

// POST route to create a new expense
// POST /api/v1/expenses/new
exports.newExpense = (req, res, next) => {
  const { category, amount, description } = req.body;
  // Get user ID from request payload
  const userId = req.user.userId;

  console.log(category, amount, description);

  Expense.create({ userId, category, amount, description })
    .then((expense) =>
      res.status(201).json({
        success: true,
        expense,
      })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: "Internal Server Error" })
    );
};

// GET route to fetch a single expense
// GET /api/v1/expenses/:id
exports.getOneExpense = async (req, res, next) => {
  // Extract user ID from request payload

  Expense.findOne({ userId: req.params.id })
    .then((expense) => {
      if (!expense) {
        res.status(404).json({ success: false, message: "Expense not found" });
      } else {
        res.status(200).json({ success: true, expense });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// PUT route to update an expense
// PUT /api/v1/expenses/:id

exports.editExpense = async (req, res, next) => {
  Expense.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
    .then((expense) => {
      if (!expense) {
        res.status(404).json({ success: false, message: "Expense not found" });
      } else {
        res.status(200).json({ success: true, expense });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// DELETE route to delete an expense
// DELETE /api/v1/expenses/:id
exports.deleteExpense = async (req, res, next) => {
  Expense.findOneAndDelete({ userId: req.params.id })
    .then((expense) => {
      if (!expense) {
        res.status(404).json({ success: false, message: "Expense not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Expense deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};
