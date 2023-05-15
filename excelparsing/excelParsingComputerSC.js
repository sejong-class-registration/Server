const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../App");
const Lecture = require("../models/lectureModel");
const Xlsx = require("xlsx");
// MongoDB 랑 연결 후, config.env 채우고 여기 주석 풀기

dotenv.config({ path: "../config.env" });

const saveLectures = async (req, res) => {
  try {
    const { lectureYear = null, lectureSemester = null } = req.body;
    console.log("year:" + lectureYear + "&& semester:" + lectureSemester);
    // 엑셀 파일 읽기
    let path = req.file.path;
    const excelFile = Xlsx.readFile(path);
    const sheetName = excelFile.SheetNames[0];
    const firstSheet = excelFile.Sheets[sheetName];
    const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });
    console.log("excel read successfully!");

    // 데이터 저장
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
    });

    const newLectures = jsonData
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
        return new Lecture({
          year: lectureYear,
          semester: lectureSemester,
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
      });

    const result = await Lecture.insertMany(newLectures);
    console.log(`Lectures saved successfully! Count: ${result.length}`);

    await mongoose.disconnect();

    res.status(200).json({
      status: "success",
      message: `Lectures saved successfully! Count: ${result.length}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while saving lectures.",
    });
  }
};
module.exports = saveLectures;
