const express = require("express");
const router = express.Router();
const Income = require("./../models/IncomeModel.js");

// GET route to fetch all Incomes
// GET /api/v1/incomes
exports.getAllIncomes = (req, res, next) => {
  Income.find()
    .then((Incomes) => res.status(200).json({ success: true, Incomes }))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

// POST route to create a new income
// POST /api/v1/incomes/new
exports.newIncome = (req, res, next) => {
  const { category, amount, description } = req.body;
  // Get user ID from request payload
  const userId = req.user.userId;

  Income.create({ userId, category, amount, description })
    .then((Income) =>
      res.status(201).json({
        success: true,
        Income,
      })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: "Internal Server Error" })
    );
};

// GET route to fetch a single Income
// GET /api/v1/incomes/:id
exports.getOneIncome = async (req, res, next) => {
  // Extract user ID from request payload

  Income.findOne({ userId: req.params.id })
    .then((Income) => {
      if (!Income) {
        res.status(404).json({ success: false, message: "Income not found" });
      } else {
        res.status(200).json({ success: true, Income });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// PUT route to update an Income
// PUT /api/v1/incomes/:id

exports.editIncome = async (req, res, next) => {
  Income.findOneAndUpdate({ userId: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
    .then((Income) => {
      if (!Income) {
        res.status(404).json({ success: false, message: "Income not found" });
      } else {
        res.status(200).json({ success: true, Income });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// DELETE route to delete an Income
// DELETE /api/v1/incomes/:id
exports.deleteIncome = async (req, res, next) => {
  Income.findOneAndDelete({ userId: req.params.id })
    .then((Income) => {
      if (!Income) {
        res.status(404).json({ success: false, message: "Income not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Income deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};
