const User = require("../models/userModel");
const Xlsx = require("xlsx");
const fs = require("fs");
const { lectureMatching, areaMatching } = require("./lectureNameMatching.js");
const Graduation = require("../models/graduateModel");

exports.getAllUsers = (req, res) => {

  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};


exports.uploadExcel = async (req, res) => {
  let path = req.file.path;
  const excelFile = Xlsx.readFile(path);
  // console.log(req.file);
  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

  let takenlectures = [];
  let totalCredit = 0;
  let majorCredit = 0;
  let takenArea = new Set();

  jsonData.map((data, index) => {
    if (index < 3) {
      // console.log('empty');
    } else {
      const number = data.__EMPTY_2;
      let name = data.__EMPTY_3.trim();
      const type = data.__EMPTY_4;
      const credit = data.__EMPTY_7 * 1;
      const userCredit = data.__EMPTY_9;
      let area = data.__EMPTY_6;
      name = lectureMatching(name);
      area = areaMatching(area);

      if (userCredit === "NP" || userCredit === "F" || userCredit === "FA") {
        // 학점 이수 실패
      } else {
        takenlectures.push(name);
        takenArea.add(area);
        if(area === '융합과창업'){
          takenArea.add('자기계발과진로');
        }

        totalCredit += credit;
        if (type === "전선" || type === "전필") majorCredit += credit;
      }
    }
  });

  const studentId = req.params.id;
  const user = await User.findOneAndUpdate(
    { studentId },
    {
      takenLectures: takenlectures,
      totalCredits: totalCredit,
      majorCredits: majorCredit
    }
  );
  const year = user.year;
  const major = user.major;
  if (year * 1 < 2018) {
    res.status(200).json({
      code: 307,
      status: "fail",
      err: "2018년도 이전 입학자 졸업요건은 등록되어있지 않습니다ㅠㅠ"
    });
  }
  const graduate = await Graduation.findOne({ year, major });
  const ge1 = graduate.공통교양필수과목;
  const ge2 = graduate.교양선택필수과목;
  const ge3 = graduate.학문기초교양필수과목;
  const ge4 = graduate.균형교양필수영역;
  const temp = [...graduate.균형교양필수영역];
  console.log(takenArea);
  const recommendLecture = [];

  ge1.forEach((e) => {
    const isTaken = takenlectures.includes(e);
    if (!isTaken) {
      console.log(e);
      recommendLecture.push({
        name: e,
        comment: "공통교양필수과목"
      });
    }
  });

  ge2.forEach((e) => {
    const isTaken = user.takenLectures.includes(e);
    if (!isTaken) {
      console.log(e);
      recommendLecture.push({
        name: e,
        comment: "교양선택필수과목"
      });
    }
  });

  ge3.forEach((e) => {
    const isTaken = user.takenLectures.includes(e);
    if (!isTaken) {
      console.log(e);
      recommendLecture.push({
        name: e,
        comment: "학문기초교양필수과목"
      });
    }
  });

  console.log(temp, ge4);

  takenArea.forEach((e)=>{
    const i = ge4.indexOf(e);
    if(i >= 0){
      ge4.splice(i,1);
    }
  })

  console.log(temp, ge4);

   await User.findOneAndUpdate(
    { studentId },
    {
      recommendLecture,
      geArea:temp,
      geAreaTaken:ge4
    }
  );

  fs.unlinkSync(path);
  res.status(200).json({
    status: "success",
    message: "upload excel!",
    data: {
      takenlectures,
      totalCredit,
      majorCredit,
      user
    }
  });
};
