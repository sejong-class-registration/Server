const User = require("../models/userModel");
const multiparty = require("multiparty");
const Lecture = require('../models/lectureModel');
const Xlsx = require("xlsx");

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
  // const excelFile = Xlsx.readFile(path);
  // // console.log(req.file);
  // const sheetName = excelFile.SheetNames[0];
  // const firstSheet = excelFile.Sheets[sheetName];
  // const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

  // jsonData.map((data, index) => {
  //   if (index < 3) {
  //     // console.log('empty');
  //   } else {
  //     const newLecture = new Lecture({
  //       name: data.__EMPTY_3,
  //       lectureId: data.__EMPTY_1,
  //       distrib: data.__EMPTY_2,
  //       classification: data.__EMPTY_5,
  //       english: data.__EMPTY_4,
  //       credit: data.__EMPTY_7,
  //       lectureGrade: data.__EMPTY_8,
  //       department: data.__EMPTY,
  //       profName: data.__EMPTY_11,
  //       room: data.__EMPTY_13,
  //       dayAndTime: data.__EMPTY_12,
  //       creditExchange: data.__EMPTY_16,
  //       notice: data.__EMPTY_17,
  //     });
  //     console.log(newLecture);
  //   }
  // });
  res.status(200).json({
    statis: "success",
    message: "upload excel!",
  });
};
