const Graduation = require("../models/graduateModel");
const Lecture = require("../models/lectureModel");
const User = require("../models/userModel");

exports.getGraduation = async (req, res) => {
  try {
    const user = await User.findOne(req.query);
    const graduate = await Graduation.findOne({
      year: user.year,
      major: user.major
    });

    let temp = await Lecture.find({
      department: user.major,
      classification: "전필"
    });
    temp = temp.map((e) => e.name);
    let temp2 = await Lecture.find({
      department: user.major,
      classification: "전선"
    });
    temp2 = temp2.map((e) => e.name);
    const mustMajor = new Set(temp);
    const selectMajor = new Set(temp2);
    console.log(mustMajor);
    const response = {
      major: {
        mustTotalCredit: graduate.mustMajorCredits,
        mustCurrentCredit: user.majorMustCredit,
        mustMajorTaken: user.mustMajorTaken,
        mustMajorOpenThisSemester: [...mustMajor],
        selectTotalCredit: graduate.selectiveMajorCredits,
        selectCurrentCredit: user.majorSelectCredit,
        selectMajorTaken: user.selectMajorTaken,
        selectMajorOpenThisSemester: [...selectMajor]
      },
      ge1: graduate.공통교양필수과목,
      takenGE1: user.takenGE1,
      ge2: graduate.교양선택필수과목,
      takenGE2: user.takenGE2,
      ge3: graduate.학문기초교양필수과목,
      takenGE3: user.takenGE3
    };
    console.log(response);
    res.status(200).json({
      status: "success",
      data: response
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
