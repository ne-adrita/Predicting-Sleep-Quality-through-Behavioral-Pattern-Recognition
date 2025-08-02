const HealthData = require('../models/HealthData');
const { analyzeSleepPattern } = require('../utils/sleepAnalyzer');
const pool = require('../config/db');

const submitInitialHealthData = async (req, res) => {
  try {
    const { caffeine, mood, stress, productivity, sleepTime } = req.body;
    await HealthData.createInitial(req.user.id, { caffeine, mood, stress, productivity, sleepTime });

    res.json({ message: 'Health data submitted successfully' });
  } catch (error) {
    console.error('Initial Health submission error:', error); // 👈 this is key
    res.status(500).json({ message: 'Internal server error', detail: error.message }); // for debug only
  }
};



const logHealthMetrics = async (req, res) => {
  try {
    const { caffeine, mood, stress, productivity, sleepTime } = req.body;
    await HealthData.addEntry(req.user.id, { caffeine, mood, stress, productivity, sleepTime });
    
    let recommendation = null;
    if (sleepTime !== undefined) {
      recommendation = await analyzeSleepPattern(req.user.id, sleepTime);
    }
    
    res.json({ message: 'Health metrics logged successfully', recommendation });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getHealthData = async (req, res) => {
  try {
    const history = await HealthData.getUserHistory(req.user.id);
    const averages = await HealthData.getAverages(req.user.id);
    
    res.json({ history, averages });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  submitInitialHealthData,
  logHealthMetrics,
  getHealthData
};