const express = require('express');
const { getUserSchedules, postUserSchedules, addLectureOnSchedule, deleteLectureOnSchedule } = require('../controllers/scheduleController');

const router = express.Router();

router.route('/').get(getUserSchedules).post(postUserSchedules);
router.route('/:id').put(addLectureOnSchedule).delete(deleteLectureOnSchedule);

module.exports = router;

