const pool = require('../config/db');

class User {
  static async create({ name, age, gender, email, password }) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, age, gender, email, password) VALUES (?, ?, ?, ?, ?)',
      [name, age, gender, email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async updatePassword(id, newPassword) {
    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [newPassword, id]);
  }

  static async updateProfile(id, { name, age, gender, email }) {
    await pool.execute(
      'UPDATE users SET name = ?, age = ?, gender = ?, email = ? WHERE id = ?',
      [name, age, gender, email, id]
    );
  }
}

module.exports = User;