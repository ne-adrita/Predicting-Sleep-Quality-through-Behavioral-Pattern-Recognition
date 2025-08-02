const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, age, gender, email } = req.body;
    await User.updateProfile(req.user.id, { name, age, gender, email });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};