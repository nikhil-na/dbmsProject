const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
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

const Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;
