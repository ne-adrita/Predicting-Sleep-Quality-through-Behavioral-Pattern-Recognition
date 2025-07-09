const express = require("express");
const router = express.Router();
const db = require("../db");

// Register
router.post("/register", (req, res) => {
  const { userId, name, age, gender, password } = req.body;
  db.query(
    "INSERT INTO users (user_id, name, age, gender, password) VALUES (?, ?, ?, ?, ?)",
    [userId, name, age, gender, password],
    (err) => {
      if (err) return res.status(500).json({ message: "Error registering user" });
      res.json({ message: "User registered successfully" });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { userId, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE user_id = ? AND password = ?",
    [userId, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Login error" });
      if (results.length > 0) res.json({ message: "Login success" });
      else res.status(401).json({ message: "Invalid credentials" });
    }
  );
});

module.exports = router;
