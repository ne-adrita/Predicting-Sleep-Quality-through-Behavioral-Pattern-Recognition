const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const healthController = require('../controllers/healthController');

router.post('/initial', auth, healthController.submitInitialHealthData);
router.post('/log', auth, healthController.logHealthMetrics);
router.get('/', auth, healthController.getHealthData);

module.exports = router;