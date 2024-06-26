const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// mysql connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to sql database successfully!");
});

module.exports = { db };

// mongodb connection
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log("Connected to mongo DB!");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

// routes
const userRoutes = require("./routes/userRoute");
app.use("/api/v1", userRoutes);

const server = app.listen(8080, () => {
  console.log(`Server running at port at 8080`);
});
