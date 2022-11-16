const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");
const Graduation = require("./models/graduateModel");

// MongoDB 랑 연결 후, config.env 채우고 여기 주석 풀기

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

const db = mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successful!");
  });

const Xlsx = require("xlsx");
const excelFile = Xlsx.readFile("./public/graduate.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });
// console.log(jsonData);

// const data = JSON.stringify(jsonData);
// console.log(data);

// jsonData.map((data, index) => {
//   if (index < 1) {
//     // console.log('empty');
//   } else if (index >= 1 && index < 264) {
//     data["균형교양필수영역"] = data["균형교양필수영역"].replace("\r\n", "");
//     data["균형교양필수영역"] = data["균형교양필수영역"].replace(
//       "역사와 사상",
//       "사상과역사"
//     );
//     data["균형교양필수영역"] = data["균형교양필수영역"].replace(
//       "자연과 과학",
//       "자연과과학기술"
//     );
//     data["균형교양필수영역"] = data["균형교양필수영역"].replace(
//       "경제와 사회",
//       "사회와문화"
//     );
//     data["균형교양필수영역"] = data["균형교양필수영역"].replace(
//       "문화와 예술",
//       "예술과체육"
//     );

//     data["공통교양필수과목"] = data["공통교양필수과목"].replace(" ", "");
//     data["교양선택필수과목"] = data["교양선택필수과목"].replace(" ", "");
//     data["학문기초교양필수과목"] = data["학문기초교양필수과목"].replace(
//       " ",
//       ""
//     );

//     const newGraduation = new Graduation({
//       year: data["입학년도"],
//       major: data["학과명"],
//       totalCredits: data["졸업학점"],
//       mustMajorCredits: data["전공필수(A)"],
//       selectiveMajorCredits: data["전공선택(B)"],
//       공통교양필수과목: data["공통교양필수과목"],
//       균형교양필수영역: data["균형교양필수영역"],
//       교양선택필수과목: data["교양선택필수과목"],
//       학문기초교양필수과목: data["학문기초교양필수과목"]
//     });
//     // console.log()
//     console.log(newGraduation);
//     try {
//       newGraduation.save();
//       console.log("success");
//     } catch (err) {
//       console.log(err);
//       console.log("faile!!!");
//     }
//   }
// });

const newGraduation = new Graduation({
  year: "2018",
  major: "컴퓨터공학과",
  totalCredits: 130,
  mustMajorCredits: 100,
  selectiveMajorCredits: 30,
  공통교양필수과목: ["공부", "수학"],
  균형교양필수영역: ["공부", "수학"],
  교양선택필수과목: ["공부", "수학"],
  학문기초교양필수과목: ["공부", "수학"]
});

newGraduation.save();
