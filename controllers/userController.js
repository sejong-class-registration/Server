const User = require("../models/userModel");
const Xlsx = require("xlsx");
const fs = require("fs");
const { lectureMatching, areaMatching } = require("./lectureNameMatching.js");
const Graduation = require("../models/graduateModel");

exports.updateUser = async (req, res) => {
  console.log(1);
  try {
    const studentId = req.params.id;
    const { name, userGrade, major, doubleMajor } = req.body;
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { studentId },
      {
        name,
        userGrade,
        major,
        doubleMajor,
      }
    );
    res.status(201).json({ status: "success", data: req.body, user });
  } catch (err) {
    res.status(404).json({ message: err });
  }
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
  let majorMustCredit = 0;
  let majorSelectCredit = 0;
  const mustMajorTaken = [];
  const selectMajorTaken = [];
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
        takenlectures.push({ name, credit });
        takenArea.add(area);
        if (area === "융합과창업") {
          takenArea.add("자기계발과진로");
        }

        totalCredit += credit;
        if (type === "전선") {
          selectMajorTaken.push(name);
          majorCredit += credit;
          majorSelectCredit += credit;
        } else if (type === "전필") {
          mustMajorTaken.push(name);
          majorCredit += credit;
          majorMustCredit += credit;
        }
      }
    }
  });

  const studentId = req.params.id;
  const user = await User.findOneAndUpdate(
    { studentId },
    {
      takenLectures: takenlectures,
      totalCredits: totalCredit,
      majorCredits: majorCredit,
      majorMustCredit,
      majorSelectCredit,
      mustMajorTaken,
      selectMajorTaken,
    }
  );
  const year = user.year;
  const major = user.major;
  console.log(year, major);
  if (year * 1 < 2017) {
    res.status(200).json({
      code: 307,
      status: "fail",
      err: "2017년도 이전 입학자 졸업요건은 등록되어있지 않습니다ㅠㅠ",
    });
  }
  const graduate = await Graduation.findOne({ year, major });
  const ge1 = graduate.공통교양필수과목;
  const ge2 = graduate.교양선택필수과목;
  console.log(ge2);
  const ge3 = graduate.학문기초교양필수과목;
  const ge4 = ['사상과역사','사회와문화','자연과과학기술','세계와지구촌','예술과체육','자기계발과진로'];
  const temp = [...ge4];
  const takenGE1 = [];
  const takenGE2 = [];
  const takenGE3 = [];

  const recommendLecture = [];
  ge1.forEach((e) => {
    // const isTaken = takenlectures.includes(e);
    const isTaken = takenlectures.findIndex((t) => {
      return e === t.name;
    });

    if (isTaken == -1) {
      console.log(e);
      recommendLecture.push({
        name: e,
        comment: "공통교양필수과목",
      });
    } else {
      takenGE1.push(takenlectures[isTaken]);
    }
  });

  ge2.forEach((e) => {
    // const isTaken = takenlectures.includes(e);
    const isTaken = takenlectures.findIndex((t) => {
      return e === t.name;
    });
    console.log(e, isTaken);
    if (isTaken == -1) {
      console.log(e);
      recommendLecture.push({
        name: e,
        comment: "교양선택필수과목",
      });
    } else {
      takenGE2.push(takenlectures[isTaken]);
    }
  });
  console.log(takenGE2);

  ge3.forEach((e) => {
    // const isTaken = takenlectures.includes(e);
    const isTaken = takenlectures.findIndex((t) => {
      return e === t.name;
    });
    if (isTaken == -1) {
      console.log(e);
      recommendLecture.push({
        name: e,
        comment: "학문기초교양필수과목",
      });
    } else {
      takenGE3.push(takenlectures[isTaken]);
    }
  });

  console.log(takenArea, ge4);

  takenArea.forEach((e) => {
    const i = ge4.indexOf(e);
    if (i >= 0) {
      ge4.splice(i, 1);
    }
  });

  await User.findOneAndUpdate(
    { studentId },
    {
      recommendLecture,
      geArea: temp,
      geAreaTaken: ge4,
      takenGE1,
      takenGE2,
      takenGE3,
    }
  );

  fs.unlinkSync(path);
  res.status(200).json({
    status: "success",
    message: "upload excel!",
    data: {
      takenlectures,
      geArea: temp,
      geAreaToTake: ge4,
      recommendLecture,
      totalCredit,
    },
  });
};
