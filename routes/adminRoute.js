const express = require("express");
const { deleteLectures } = require("../controllers/lectureAdminController");
const { signIn } = require("../controllers/adminAuthController.js");
const saveLectures = require("../excelparsing/excelParsingComputerSC.js");
const multer = require("multer");
const router = express.Router();

router.route("/").post(signIn);
router.route("/lectures").delete(deleteLectures);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.route("/lectures").post(upload.single("xlsx"), saveLectures);

module.exports = router;
