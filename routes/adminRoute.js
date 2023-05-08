const express = require("express");
const { deleteLectures } = require("../controllers/lectureAdminController");
const { signIn } = require("../controllers/adminAuthController.js");

const router = express.Router();

router.route("/").post(signIn);
router.route("/lectures").delete(deleteLectures);
module.exports = router;
