const Activity = require('../models/Activity');

const logActivity = async (req, res) => {
  try {
    const { activityType } = req.body;
    
    if (!['Running', 'Walking'].includes(activityType)) {
      return res.status(400).json({ message: 'Invalid activity type' });
    }
    
    const activityId = await Activity.create(req.user.id, activityType);
    res.json({ message: 'Activity logged successfully', activityId });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.getUserActivities(req.user.id);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  logActivity,
  getActivities
};