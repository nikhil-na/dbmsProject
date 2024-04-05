const { db } = require("../app");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const sendTokenResponse = require("../utils/jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const sql =
    "INSERT INTO USERS (`NAME`, `EMAIL`, `PASSWORD`) VALUES (?, ?, ?)";
  const hashedPassword = await hashPassword(password);

  const values = [name, email, hashedPassword];

  db.query(sql, values, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "Failed to register user",
        message: err,
      });
    } else {
      sendTokenResponse({ user: data.insertId }, 201, res);
    }
  });
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const sql = "SELECT * FROM USERS WHERE EMAIL = ?";
    const values = [email];

    db.query(sql, values, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "Failed to login",
          message: err,
        });
      } else {
        if (data.length === 0) {
          // No user found with the provided email
          res.status(404).json({
            error: "User not found",
            message: "No user found with the provided email",
          });
        } else {
          const user = data[0];
          if (comparePassword(password, user.PASSWORD)) {
            sendTokenResponse({ user: user.ID }, 200, res);
          } else {
            res.status(401).json({
              error: "Unauthorized",
              message: "Incorrect password",
            });
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to login",
      message: error.message,
    });
  }
};

exports.logoutUser = (req, res, next) => {
  res.clearCookie("jwtoken");

  res.status(200).json({
    status: "Success",
    message: "User logged out",
  });
}

exports.getDashboard = (req, res, next) => {
  res.status(200).json({
    success_jwt: true,
    status: "Success",
    message: "Welcome to the dashboard!",
    user: req.user, // Assuming req.user contains the authenticated user's information
  });
};
