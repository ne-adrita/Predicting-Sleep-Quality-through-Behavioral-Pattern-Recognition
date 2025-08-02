const HealthData = require('../models/HealthData');


const analyzeSleepPattern = async (userId, sleepTime) => {
  const healthData = await HealthData.getAverages(userId);
  
  let recommendation = 'Your sleep pattern looks good!';
  
  if (sleepTime < 6) {
    if (healthData.avg_productivity < 5) {
      recommendation = 'You\'re getting less than 6 hours of sleep and your productivity is low. Consider increasing your sleep duration to 7-9 hours for better performance.';
    } else {
      recommendation = 'You\'re getting less than 6 hours of sleep. While your productivity seems okay, more sleep might improve it further.';
    }
  } else if (sleepTime > 9) {
    recommendation = 'You\'re sleeping more than 9 hours regularly. Oversleeping can sometimes be associated with health issues. Consider checking with a healthcare provider if this is a regular pattern.';
  } else if (healthData.avg_stress > 7 && sleepTime < 7) {
    recommendation = 'Your stress levels are high and you\'re getting less than 7 hours of sleep. Improving sleep duration can help reduce stress. Try relaxation techniques before bed.';
  }
  
  return recommendation;
};

module.exports = { analyzeSleepPattern };