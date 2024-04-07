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
      const user = {
        USER_ID: data.insertId,
        NAME: name,
        EMAIL: email,
      };
      sendTokenResponse({ user }, 201, res);
    }
  });
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const sql = "SELECT * FROM USERS WHERE EMAIL = ?";
    const values = [email];

    db.query(sql, values, async (err, data) => {
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
          console.log(user);
          if (await comparePassword(password, user.PASSWORD)) {
            sendTokenResponse({ user }, 200, res);
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
};

exports.getUser = (req, res) => {
  const userId = req.user.userId;
  const sql = `SELECT NAME FROM USERS WHERE USER_ID = ${userId}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ err: "Internal Server Error" });
    } else {
      if (data.length === 0) {
        res.status(404).json({ err: "User not found" });
      } else {
        const userName = data[0].NAME;
        console.log(userName);
        res.status(200).json({ status: "Success", userName });
      }
    }
  });
};

exports.getDashboard = (req, res, next) => {
  console.log(req.user);
  res.status(200).json({
    success_jwt: true,
    status: "Success",
    message: "Welcome to the dashboard",
    user: req.user,
  });
};
