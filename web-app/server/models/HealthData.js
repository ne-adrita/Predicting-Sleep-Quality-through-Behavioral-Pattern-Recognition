const pool = require('../config/db');

class HealthData {
  static async createInitial(userId, { caffeine, mood, stress, productivity, sleepTime }) {
    await pool.execute(
      'INSERT INTO health_data (user_id, caffeine, mood, stress, productivity, sleep_time) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, caffeine, mood, stress, productivity, sleepTime]
    );
  }

  static async addEntry(userId, { caffeine, mood, stress, productivity, sleepTime }) {
    await pool.execute(
      'INSERT INTO health_data (user_id, caffeine, mood, stress, productivity, sleep_time, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [userId, caffeine, mood, stress, productivity, sleepTime]
    );
  }

  static async getUserHistory(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM health_data WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async getLatest(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM health_data WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    return rows[0];
  }

  static async getAverages(userId) {
    const [rows] = await pool.execute(
      `SELECT 
        AVG(caffeine) as avg_caffeine,
        AVG(mood) as avg_mood,
        AVG(stress) as avg_stress,
        AVG(productivity) as avg_productivity,
        AVG(sleep_time) as avg_sleep_time
      FROM health_data WHERE user_id = ?`,
      [userId]
    );
    return rows[0];
  }
}

module.exports = HealthData;