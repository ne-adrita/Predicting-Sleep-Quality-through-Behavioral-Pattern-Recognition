const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const activityRoutes = require('./routes/activityRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5070;

app.use(cors());
app.use(express.json());

// quick‐and‐dirty debug route
// app.get('/ping', (req, res) => {
//   console.log('🔥 /ping hit');
//   res.json({ pong: true, time: Date.now() });
// });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/profile', profileRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Naptagram API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// console.log(`✅ Express listening on http://${HOST || '127.0.0.1'}:${PORT}`);
