const express = require('express');
const { getUserSchedules, postUserSchedules } = require('../controllers/scheduleController');

const router = express.Router();

router.route('/').get(getUserSchedules).post(postUserSchedules);

module.exports = router;