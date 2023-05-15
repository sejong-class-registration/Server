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
const excelFile = Xlsx.readFile("../public/2022-2.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

const data = JSON.stringify(jsonData);

jsonData
  .filter((data, index) => {
    // 필요없는 데이터는 건너뜀
    if (
      data.__EMPTY === "개설학과전공" ||
      data.__EMPTY_6 === "개설강좌 리스트" ||
      data.__EMPTY_3 === ""
    ) {
      return false;
    }
    return true;
  })
  .map((data) => {
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
      notice: data.__EMPTY_17,
    });
    try {
      newLecture.save();
    } catch (err) {
      console.log(err);
    }
  });
