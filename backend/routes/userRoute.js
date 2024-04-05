const express = require("express");
const router = express.Router();

const {
  loginUser,
  getDashboard,
  registerUser,
  logoutUser,
} = require("../controllers/authController");
const requireAuth = require("../middleware/requireAuth");

router.post("/student/signup", registerUser);
router.post("/student/login", loginUser);
router.get("/dashboard", requireAuth, getDashboard);
router.get("/logout", logoutUser);

module.exports = router;
