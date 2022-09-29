const express = require('express');
const { getUserSchedules, postUserSchedules, addLectureOnSchedule } = require('../controllers/scheduleController');

const router = express.Router();

router.route('/').get(getUserSchedules).post(postUserSchedules);
router.route('/:id').put(addLectureOnSchedule);

module.exports = router;

