const User = require("../models/userModel");

// 메모장 조회
exports.getMemo = async (req, res, next) => {
  try {
    const { studentId, semester } = req.params;
    const user = await User.findOne({ studentId });
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

// 메모 내용 추가
exports.addMemoContent = async (req, res) => {
  const { studentId, semester } = req.params;
  const { content } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { studentId: studentId },
      { $push: { memo: { content: content, semester: semester } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "해당 학생을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      message: "메모가 추가되었습니다.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "서버 에러 발생",
      error: error,
    });
  }
};

// 메모장 생성
// exports.createMemo = async (req, res, next) => {
//   try {
//     const { studentId, semester } = req.params;
//     const user = await User.findOne({ studentId });
//     const memoExists = user.memo.find((memo) => memo.semester === semester);

//     if (memoExists) {
//       return res
//         .status(202)
//         .json({ status: "Fail", message: "이미 메모가 존재합니다" });
//     }

//     const memo = {
//       semester,
//       content: [],
//     };

//     user.memo.push(memo);
//     await user.save();

//     res.status(200).json({
//       status: "success",
//       message: "Memo created successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
