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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// ============================ DASHBOARD =================================
// Get jobs with optional active filter
app.get("/api/admin/jobs", (req, res) => {
  const { active } = req.query; // ?active=true or ?active=false
  let sql = "SELECT * FROM job_listings";
  const params = [];

  if (active === "true") {
    sql += " WHERE is_active = TRUE";
  } else if (active === "false") {
    sql += " WHERE is_active = FALSE";
  }

  sql += " ORDER BY posted_at DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Add a new job
app.post("/api/admin/jobs", (req, res) => {
  const { title, location, job_type, description, requirements, salary_range } = req.body;
  const sql = `
    INSERT INTO job_listings (title, location, job_type, description, requirements, salary_range)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [title, location, job_type, description, requirements, salary_range], (err, result) => {
    if (err) {
      console.error("Error adding job:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ id: result.insertId, message: "Job added successfully" });
  });
});

// Mark job inactive (soft delete)
app.patch("/api/admin/jobs/:id/inactive", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE job_listings SET is_active = FALSE WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error updating job:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Job marked as inactive" });
  });
});

// Delete job (hard delete if you really want it gone)
app.delete("/api/admin/jobs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM job_listings WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting job:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Job deleted successfully" });
  });
});




module.exports = app;
