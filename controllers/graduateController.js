const Graduation = require("../models/graduateModel");
const Lecture = require("../models/lectureModel");
const User = require("../models/userModel");

const getGraduation = async (req, res) => {
  try {
    const user = await User.findOne(req.query);
    const graduate = await Graduation.findOne({
      year: `20${user.studentId.slice(0, 2)}`,
      major: user.major,
    });
    const geAreaCount = user.studentId.slice(0, 2) * 1 < 22 ? 3 : 2;
    console.log(geAreaCount);

    let ge1TakenCredit = 0;
    let ge2TakenCredit = 0;
    let ge3TakenCredit = 0;
    console.log(user.takenGE1);
    user.takenGE1.forEach((e) => {
      ge1TakenCredit += e.credit;
    });
    console.log(user.takenGE2);

    user.takenGE2.forEach((e) => {
      ge2TakenCredit += e.credit;
    });

    user.takenGE3.forEach((e) => {
      ge3TakenCredit += e.credit;
    });
    console.log(1);
    let temp = await Lecture.find({
      department: user.major,
      classification: "전필",
    });
    temp = temp.map((e) => e.name);
    let temp2 = await Lecture.find({
      department: user.major,
      classification: "전선",
    });
    temp2 = temp2.map((e) => e.name);
    const mustMajor = new Set(temp);
    const selectMajor = new Set(temp2);
    // console.log(mustMajor);
    const response = {
      totalCredit: graduate.totalCredits,
      currentCredit: user.totalCredits,
      major: {
        mustTotalCredit: graduate.mustMajorCredits,
        mustCurrentCredit: user.majorMustCredit,
        mustMajorTaken: user.mustMajorTaken,
        mustMajorOpenThisSemester: [...mustMajor],
        selectTotalCredit: graduate.selectiveMajorCredits,
        selectCurrentCredit: user.majorSelectCredit,
        selectMajorTaken: user.selectMajorTaken,
        selectMajorOpenThisSemester: [...selectMajor],
      },
      ge1: graduate.공통교양필수과목,
      takenGE1: user.takenGE1,
      ge1TakenCredit,
      ge1TotalCredit: graduate.공통교양필수학점,
      ge2: graduate.교양선택필수과목,
      takenGE2: user.takenGE2,
      ge2TakenCredit,
      ge2TotalCredit: graduate.균형교양필수학점,
      ge3: graduate.학문기초교양필수과목,
      takenGE3: user.takenGE3,
      ge3TakenCredit,
      ge3TotalCredit: graduate.학문기초교양필수학점,
      geArea: user.geArea,
      geAreaNotTaken: user.geAreaTaken,
      geAreaTakenCredit: user.geAreaTakenCredit,
      geAreaCount,
    };
    // console.log(response);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = getGraduation;
