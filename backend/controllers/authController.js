const { db } = require("../app");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const bcrypt = require("bcrypt");

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
      res.status(200).json({
        status: "Success",
        data,
      });
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
            res.status(200).json({
              status: "Success",
              message: "Login successful",
              user: {
                id: user.ID,
                name: user.NAME,
                email: user.EMAIL,
              },
            });
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

exports.getDashboard = (req, res, next) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to the dashboard!",
    user: req.user, // Assuming req.user contains the authenticated user's information
  });
};
