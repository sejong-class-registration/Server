const express = require("express");
const memoController = require("../controllers/memoController");

const router = express.Router();

// 메모장 조회
router.get("/:studentId/:semester", memoController.getMemo);

// 메모장 생성
// router.post("/:studentId/:semester", memoController.createMemo);

// 메모 내용 추가
router.patch("/:studentId/:semester", memoController.addMemoContent);

module.exports = router;
