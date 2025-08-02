const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db");
const cors = require('cors');
app.use(cors());

// Register a user
app.post('/api/register', (req, res) => {
    const { user_id, name, age, gender, password } = req.body;
    const sql = 'INSERT INTO users (user_id, name, age, gender, password) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [user_id, name, age, gender, password], (err, result) => {
      if (err) return res.status(500).send('Error registering user');
      res.status(200).send('User registered');
    });
  });
  
  // Login user
  app.post('/api/login', (req, res) => {
    const { user_id, password } = req.body;
    const sql = 'SELECT * FROM users WHERE user_id = ? AND password = ?';
    connection.query(sql, [user_id, password], (err, results) => {
      if (err) return res.status(500).send('Error logging in');
      if (results.length === 0) return res.status(401).send('Invalid credentials');
      res.status(200).json({ message: 'Login successful', user: results[0] });
    });
  });
  
  // Add activity
  app.post('/api/activity', (req, res) => {
    const { activity_id, user_id, activity_type, duration } = req.body;
    const sql = 'INSERT INTO activity (activity_id, user_id, activity_type, duration) VALUES (?, ?, ?, ?)';
    connection.query(sql, [activity_id, user_id, activity_type, duration], (err, result) => {
      if (err) return res.status(500).send('Error adding activity');
      res.status(200).send('Activity added');
    });
  });
  
  // Add sleep session
  app.post('/api/sleep', (req, res) => {
    const { session_id, user_id, date, duration } = req.body;
    const sql = 'INSERT INTO sleep_sessions (session_id, user_id, date, duration) VALUES (?, ?, ?, ?)';
    connection.query(sql, [session_id, user_id, date, duration], (err, result) => {
      if (err) return res.status(500).send('Error adding sleep session');
      res.status(200).send('Sleep session added');
    });
  });
  
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/activity", require("./routes/activity"));
app.use("/api/sleep", require("./routes/sleep"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
