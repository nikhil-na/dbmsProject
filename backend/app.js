const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: [`http://localhost:3000`],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

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
  console.log("Connected to database successfully!");
});

module.exports = { db };

const userRoutes = require("./routes/userRoute");

app.use("/api/v1", userRoutes);

const server = app.listen(8080, () => {
  console.log(`Server running at port at 8080`);
});
