const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../App");
const Lecture = require("../models/lectureModel");

// MongoDB 랑 연결 후, config.env 채우고 여기 주석 풀기

dotenv.config({ path: "../config.env" });

const DB = process.env.DATABASE;

const db = mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successful!");
  });

const Xlsx = require("xlsx");
const excelFile = Xlsx.readFile("../public/nodeExcelComputerSC.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

// console.log(jsonData);

// const data = JSON.stringify(jsonData);
// console.log(data);

jsonData.map((data, index) => {
  if (index < 3) {
    console.log('empty');
  } else {
    const newLecture = new Lecture({
      name: data.__EMPTY_3,
      lectureId: data.__EMPTY_1,
      distrib: data.__EMPTY_2,
      classification: data.__EMPTY_5,
      english: data.__EMPTY_4,
      credit: data.__EMPTY_7,
      lectureGrade: data.__EMPTY_8,
      department: data.__EMPTY,
      profName: data.__EMPTY_11,
      room: data.__EMPTY_13,
      dayAndTime: data.__EMPTY_12,
      creditExchange: data.__EMPTY_16,
      notice: data.__EMPTY_17
    });
    console.log(newLecture);
    try {
      newLecture.save();
    } catch (err) {
      console.log(err);
    }
  }
});