const User = require("../models/userModel");
const multiparty = require("multiparty");
const Lecture = require("../models/lectureModel");
const Xlsx = require("xlsx");
const fs = require("fs");
const { lectureMatching } = require("./lectureNameMatching.js");

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.uploadExcel = (req, res) => {
  let path = req.file.path;
  const excelFile = Xlsx.readFile(path);
  // console.log(req.file);
  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

  let takenletures = [];
  let totalCredit = 0;
  let majorCredit = 0;

  jsonData.map((data, index) => {
    if (index < 3) {
      // console.log('empty');
    } else {
      const number = data.__EMPTY_2;
      let name = data.__EMPTY_3.trim();
      const type = data.__EMPTY_4;
      const credit = data.__EMPTY_7 * 1;
      const userCredit = data.__EMPTY_9;

      name = lectureMatching(name);

      if (userCredit === "NP" || userCredit === "F" || userCredit === "FA") {
        // 학점 이수 실패
      } else {
        takenletures.push(name);
        totalCredit += credit;
        if (type === "전선" || type === "전필") majorCredit += credit;
      }
    }
  });
  fs.unlinkSync(path);
  res.status(200).json({
    statis: "success",
    message: "upload excel!",
    data: {
      takenletures,
      totalCredit,
      majorCredit,
    },
  });
};
