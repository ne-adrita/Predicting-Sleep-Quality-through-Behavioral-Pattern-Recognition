const pool = require('../config/db');

class Activity {
  static async create(userId, activityType) {
    const [result] = await pool.execute(
      'INSERT INTO activities (user_id, activity_type) VALUES (?, ?)',
      [userId, activityType]
    );
    return result.insertId;
  }

  static async getUserActivities(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }
}

module.exports = Activity;