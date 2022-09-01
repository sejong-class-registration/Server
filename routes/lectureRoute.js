const express = require('express');
const {getAllLectures} = require('../controllers/lectureContoller.js');

const router = express.Router();

router.route('/').get(getAllLectures);

module.exports = router;