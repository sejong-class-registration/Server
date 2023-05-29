const express = require("express");
const {
  getAllLectures,
  getSomeLectures,
} = require("../controllers/lectureContoller.js");
const { getRecommend } = require("../controllers/recommendController.js");
const router = express.Router();

router.route("/").get(getSomeLectures);
router.route("/recommend").get(getRecommend);

module.exports = router;
