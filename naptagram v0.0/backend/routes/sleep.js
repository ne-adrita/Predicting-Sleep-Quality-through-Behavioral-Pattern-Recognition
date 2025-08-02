const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { session_id, user_id, date, duration } = req.body;
  db.query(
    "INSERT INTO sleep_sessions (session_id, user_id, date, duration) VALUES (?, ?, ?, ?)",
    [session_id, user_id, date, duration],
    (err) => {
      if (err) return res.status(500).json({ message: "Error recording sleep session" });
      res.json({ message: "Sleep session recorded" });
    }
  );
});

module.exports = router;
