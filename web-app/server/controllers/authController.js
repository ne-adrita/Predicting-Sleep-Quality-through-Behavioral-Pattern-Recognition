const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const HealthData = require('../models/HealthData');
const { sendPasswordResetEmail } = require('../utils/emailService');

const register = async (req, res) => {
  try {
    const { name, age, gender, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const userId = await User.create({
      name,
      age,
      gender,
      email,
      password: hashedPassword
    });
    
    // Generate token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token, userId, isNewUser: true });
  } catch (error) {
    console.error('Register error:', error);
    // For debugging only—consider removing error detail in production
    res.status(500).json({ message: 'Something went wrong', detail: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Check if user has health data (to determine if they're new)
    const healthData = await HealthData.getLatest(user.id);
    const isNewUser = !healthData;
    
    res.json({ token, userId: user.id, isNewUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log("Request received:", req.body);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendPasswordResetEmail(email, resetToken);
    
    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(decoded.id, hashedPassword);
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};