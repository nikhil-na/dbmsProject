const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "User",
  },

  category: {
    type: String,
    ref: "Category",
  },

  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
