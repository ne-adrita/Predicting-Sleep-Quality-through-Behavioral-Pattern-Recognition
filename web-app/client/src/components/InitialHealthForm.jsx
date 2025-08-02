import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const InitialHealthForm = () => {
  const [formData, setFormData] = useState({
    caffeine: '',
    mood: '',
    stress: '',
    productivity: '',
    sleepTime: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/health/initial', formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to submit health data');
    }
  };

  return (
    <div className="initial-health-form">
      <h2>Initial Health Data</h2>
      <p>Please provide your average health metrics to get started.</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Average Caffeine Intake (mg per day)</label>
          <input
            type="number"
            name="caffeine"
            value={formData.caffeine}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Average Mood Level (1-10)</label>
          <input
            type="number"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Average Stress Level (1-10)</label>
          <input
            type="number"
            name="stress"
            value={formData.stress}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Average Productivity Level (1-10)</label>
          <input
            type="number"
            name="productivity"
            value={formData.productivity}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Average Sleep Time (hours per night)</label>
          <input
            type="number"
            name="sleepTime"
            value={formData.sleepTime}
            onChange={handleChange}
            min="0"
            max="24"
            step="0.5"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InitialHealthForm;