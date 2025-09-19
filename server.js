// ========= Imports ==========
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// ========= Config ==========

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

//Basic working server with API CONFIGURATION

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ============================= API CALLS ==================================

// ===== Get all job listings =====
app.get("/api/jobs", (req, res) => {
  const sql = "SELECT * FROM job_listings WHERE is_active = TRUE ORDER BY posted_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching job listings:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ===== Ping the server =====
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});


app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});



module.exports = app;
