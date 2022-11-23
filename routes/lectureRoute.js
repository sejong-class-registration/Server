const express = require('express');
const {getAllLectures} = require('../controllers/lectureContoller.js');
const {getRecommend} = require('../controllers/recommendController.js');

const router = express.Router();

router.route('/').get(getAllLectures);

router.route('/recommend').get(getRecommend);

module.exports = router;