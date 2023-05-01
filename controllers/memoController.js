const User = require("../models/userModel");

// 메모장 조회
exports.getMemo = async (req, res, next) => {
  try {
    const { userId, semester } = req.params;
    const user = await User.findById(userId);
    const memo = user.memo.find((memo) => memo.semester === semester);

    if (!memo) {
      return res
        .status(202)
        .json({ status: "Fail", message: "Memo not found" });
    }

    res.status(200).json({
      status: "success",
      data: memo,
    });
  } catch (error) {
    next(error);
  }
};

// 메모장 생성
exports.createMemo = async (req, res, next) => {
  try {
    const { userId, semester } = req.params;
    const user = await User.findById(userId);

    const memoExists = user.memo.find((memo) => memo.semester === semester);

    if (memoExists) {
      return res
        .status(202)
        .json({ status: "Fail", message: "이미 메모가 존재합니다" });
    }

    const memo = {
      semester,
      content: [],
    };

    user.memo.push(memo);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Memo created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// 메모 내용 추가
exports.addMemoContent = async (req, res, next) => {
  try {
    const { userId, semester } = req.params;
    const { content } = req.body;
    const user = await User.findById(userId);

    const memo = user.memo.find((memo) => memo.semester.equals(semester));

    if (!memo) {
      return res
        .status(202)
        .json({ status: "Fail", message: "Memo not found" });
    }

    memo.content.push(content);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Memo content added successfully",
    });
  } catch (error) {
    next(error);
  }
};
