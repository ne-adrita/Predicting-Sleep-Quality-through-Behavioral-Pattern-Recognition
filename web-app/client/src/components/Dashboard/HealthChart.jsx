import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../../services/api';

const HealthChart = () => {
  const [healthData, setHealthData] = useState([]);
  const [averages, setAverages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const { data } = await api.get('/health');
        setHealthData(data.history);
        
        const raw = data.averages;
        setAverages({
          avg_caffeine: +raw.avg_caffeine,
          avg_mood: +raw.avg_mood,
          avg_stress: +raw.avg_stress,
          avg_productivity: +raw.avg_productivity,
          avg_sleep_time: +raw.avg_sleep_time
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health data:', error);
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const chartData = healthData.map(entry => ({
    date: new Date(entry.created_at).toLocaleDateString(),
    caffeine: entry.caffeine,
    mood: entry.mood,
    stress: entry.stress,
    productivity: entry.productivity,
    sleepTime: entry.sleep_time
  }));

  return (
    <div className="card">
      <h3>Your Health Metrics</h3>
      {averages && (
        <div className="averages">
          <p>
            <span>Average Caffeine</span>
            {averages.avg_caffeine.toFixed(1)} mg
          </p>
          <p>
            <span>Average Mood</span>
            {averages.avg_mood.toFixed(1)}/10
          </p>
          <p>
            <span>Average Stress</span>
            {averages.avg_stress.toFixed(1)}/10
          </p>
          <p>
            <span>Average Productivity</span>
            {averages.avg_productivity.toFixed(1)}/10
          </p>
          <p>
            <span>Average Sleep</span>
            {averages.avg_sleep_time.toFixed(1)} hours
          </p>
        </div>
      )}
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" />
            <XAxis dataKey="date" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip 
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="caffeine"    
              stroke="#5E72E4" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="mood"        
              stroke="#11CDEF" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="stress"      
              stroke="#F5365C" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="productivity"
              stroke="#2DCE89" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="sleepTime"   
              stroke="#805AD5" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthChart;