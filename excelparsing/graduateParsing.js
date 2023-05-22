const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Graduation = require("../models/graduateModel");
const Xlsx = require("xlsx");

// MongoDB 랑 연결 후, config.env 채우고 여기 주석 풀기
const errorGenerator = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

dotenv.config({ path: "../config.env" });

const saveGraduations = async (req, res) => {
  try {
    const { graduationYear = null } = req.body;
    console.log("year:" + graduationYear);
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

    const graduations = jsonData
      .filter((data, index) => {
        if (data["입학년도"] != graduationYear) {
          errorGenerator("입학년도가 다릅니다", 203);
          return false;
        }
        return index >= 0;
      })
      .map((data) => {
        data["공통교양필수과목"] = data["공통교양필수과목"].replace(" ", "");
        data["교양선택필수과목"] = data["교양선택필수과목"].replace(" ", "");
        data["학문기초교양필수과목"] = data["학문기초교양필수과목"].replace(
          " ",
          ""
        );

        return {
          year: data["입학년도"],
          major: data["학과명"],
          totalCredits: data["졸업학점"],
          mustMajorCredits: data["전공필수(A)"],
          selectiveMajorCredits: data["전공선택(B)"],
          공통교양필수과목: data["공통교양필수과목"].split(","),
          공통교양필수학점: data["공통교양필수"],
          균형교양필수영역: data["균형교양필수영역"].split(","),
          균형교양필수학점: data["균형교양필수"],
          교양선택필수과목: data["교양선택필수과목"].split(","),
          학문기초교양필수과목: data["학문기초교양필수과목"].split(","),
          학문기초교양필수학점: data["학문기초교양필수"],
        };
      });

    await Graduation.insertMany(graduations);
    console.log(`Graduations saved successfully! Count: ${graduations.length}`);

    res.status(200).json({
      status: "success",
      message: `Graduations saved successfully! Count: ${jsonData.length}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while saving graduations.",
    });
  }
};
module.exports = saveGraduations;

// const newGraduation = new Graduation({
//   year: "2018",
//   major: "컴퓨터공학과",
//   totalCredits: 130,
//   mustMajorCredits: 100,
//   selectiveMajorCredits: 30,
//   공통교양필수과목: ["공부", "수학"],
//   균형교양필수영역: ["공부", "수학"],
//   교양선택필수과목: ["공부", "수학"],
//   학문기초교양필수과목: ["공부", "수학"]
// });
