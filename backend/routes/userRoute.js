const express = require("express");
const router = express.Router();

const {
  loginUser,
  getDashboard,
  registerUser,
} = require("../controllers/authController");
// const { requireAuth } = require("../middleware/requireAuth");

router.post("/student/signup", registerUser);
router.post("/student/login", loginUser);
router.get("/dashboard", getDashboard);

module.exports = router;
