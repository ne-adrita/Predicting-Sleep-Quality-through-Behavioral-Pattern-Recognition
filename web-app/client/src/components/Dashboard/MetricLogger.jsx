import { useState } from 'react';
import api from '../../services/api';

const MetricLogger = () => {
  const [formData, setFormData] = useState({
    caffeine: '',
    mood: '',
    stress: '',
    productivity: '',
    sleepTime: ''
  });
  const [recommendation, setRecommendation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/health/log', formData);
      setMessage('Metrics logged successfully!');
      setError('');
      if (formData.sleepTime && response.data.recommendation) {
        setRecommendation(response.data.recommendation);
      }
      setTimeout(() => {
        setMessage('');
        setRecommendation('');
      }, 5000);
      setFormData({
        caffeine: '',
        mood: '',
        stress: '',
        productivity: '',
        sleepTime: ''
      });
    } catch (err) {
      setError('Failed to log metrics');
      setMessage('');
    }
  };

  return (
    <div className="card">
      <h3>Log Health Metrics</h3>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
      {recommendation && (
        <div className="alert info">
          <h4>Sleep Recommendation</h4>
          <p>{recommendation}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Caffeine Intake (mg)</label>
          <input
            type="number"
            name="caffeine"
            value={formData.caffeine}
            onChange={handleChange}
            min="0"
            placeholder="Enter caffeine intake"
          />
        </div>
        <div className="form-group">
          <label>Mood Level (1-10)</label>
          <input
            type="number"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            min="1"
            max="10"
            placeholder="Rate your mood"
          />
        </div>
        <div className="form-group">
          <label>Stress Level (1-10)</label>
          <input
            type="number"
            name="stress"
            value={formData.stress}
            onChange={handleChange}
            min="1"
            max="10"
            placeholder="Rate your stress"
          />
        </div>
        <div className="form-group">
          <label>Productivity Level (1-10)</label>
          <input
            type="number"
            name="productivity"
            value={formData.productivity}
            onChange={handleChange}
            min="1"
            max="10"
            placeholder="Rate your productivity"
          />
        </div>
        <div className="form-group">
          <label>Sleep Time (hours)</label>
          <input
            type="number"
            name="sleepTime"
            value={formData.sleepTime}
            onChange={handleChange}
            min="0"
            max="24"
            step="0.5"
            placeholder="Enter sleep duration"
          />
        </div>
        <button type="submit" className="w-full">
          Log Metrics
        </button>
      </form>
    </div>
  );
};

export default MetricLogger;