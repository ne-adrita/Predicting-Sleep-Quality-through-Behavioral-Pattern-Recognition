const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const activityController = require('../controllers/activityController');

router.post('/', auth, activityController.logActivity);
router.get('/', auth, activityController.getActivities);

module.exports = router;