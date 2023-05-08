const express = require("express");

const { getGraduation } = require("../controllers/graduateController.js");

const router = express.Router();

router.route("/").get(getGraduation);

module.exports = router;
