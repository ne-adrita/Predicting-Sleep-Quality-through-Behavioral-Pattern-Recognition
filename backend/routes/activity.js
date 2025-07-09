const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { activity_id, user_id, activity_type, duration } = req.body;
  db.query(
    "INSERT INTO activity (activity_id, user_id, activity_type, duration) VALUES (?, ?, ?, ?)",
    [activity_id, user_id, activity_type, duration],
    (err) => {
      if (err) return res.status(500).json({ message: "Error logging activity" });
      res.json({ message: "Activity logged" });
    }
  );
});

module.exports = router;
