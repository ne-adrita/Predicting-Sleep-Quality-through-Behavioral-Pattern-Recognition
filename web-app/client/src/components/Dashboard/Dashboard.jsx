import { useAuth } from '../../context/AuthContext';
import HealthChart from './HealthChart';
import ActivityLogger from './ActivityLogger';
import MetricLogger from './MetricLogger';
import ProfileManager from './ProfileManager';

const Dashboard = () => {
  const { logout, user } = useAuth();

  return (
    <div className="dashboard">
      <header>
        <div>
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-gray-500">Track your health and activities</p>
        </div>
        <button 
          onClick={logout}
          className="secondary"
        >
          Logout
        </button>
      </header>
      <div className="dashboard-content">
        <div className="main-section">
          <HealthChart />
          <MetricLogger />
        </div>
        <div className="sidebar">
          <ActivityLogger />
          <ProfileManager />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;