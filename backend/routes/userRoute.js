const express = require("express");
const router = express.Router();

const {
  loginUser,
  getDashboard,
  registerUser,
  logoutUser,
} = require("../controllers/authController");
const {
  getAllExpenses,
  newExpense,
  getOneExpense,
  deleteExpense,
  editExpense,
} = require("../controllers/expenseController");

const requireAuth = require("../middleware/requireAuth");

router.post("/student/signup", registerUser);
router.post("/student/login", loginUser);
router.get("/dashboard", requireAuth, getDashboard);
router.get("/logout", logoutUser);

router.post("/expenses/new", requireAuth, newExpense);
router.get("/expenses", requireAuth, getAllExpenses);
router.get("/expenses/:id", requireAuth, getOneExpense);
router.delete("/expenses/:id", requireAuth, deleteExpense);
router.put("/expenses/:id", requireAuth, editExpense);

module.exports = router;
