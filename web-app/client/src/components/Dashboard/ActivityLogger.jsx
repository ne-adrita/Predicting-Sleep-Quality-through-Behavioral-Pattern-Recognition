import { useState } from 'react';
import api from '../../services/api';

const ActivityLogger = () => {
  const [activityType, setActivityType] = useState('Walking');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/activities', { activityType });
      setMessage('Activity logged successfully!');
      setError('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to log activity');
      setMessage('');
    }
  };

  return (
    <div className="card">
      <h3>Log Activity</h3>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Activity Type</label>
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option value="Walking">Walking</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Gym">Gym</option>
            <option value="Nothing">Nothing</option>
          </select>
        </div>
        <button type="submit" className="w-full">
          Log Activity
        </button>
      </form>
    </div>
  );
};

export default ActivityLogger;