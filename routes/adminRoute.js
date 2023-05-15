const express = require("express");
const { deleteLectures } = require("../controllers/lectureAdminController");
const { signIn } = require("../controllers/adminAuthController.js");
const saveLectures = require("../excelparsing/excelParsingComputerSC.js");
const multer = require("multer");
const router = express.Router();

router.route("/").post(signIn);
router.route("/lectures").delete(deleteLectures);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 파일 경로 지정
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); // 파일 확장자 추출
    cb(null, Date.now() + "." + ext); // 요청 시간을 기준으로 파일명 생성
  },
});

const upload = multer({ storage: storage });
router.route("/lectures").post(upload.single("xlsx"), saveLectures);

module.exports = router;
