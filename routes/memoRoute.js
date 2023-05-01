const express = require("express");
const memoController = require("../controllers/memoController");

const router = express.Router();

// 메모장 조회
router.get("/:userId/:semester", memoController.getMemo);

// 메모장 생성
router.post("/:userId/:semester", memoController.createMemo);

// 메모 내용 추가
router.patch("/:userId/:semester", memoController.addMemoContent);

module.exports = router;
