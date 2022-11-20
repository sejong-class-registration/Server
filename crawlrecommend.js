const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");
const Crawling = require("./models/crawlingModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

const db = mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    // console.log("DB connection successful!");
  });

const Xlsx = require("xlsx");
const excelFile = Xlsx.readFile("./public/recommend.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

//console.log(jsonData);

//const data = JSON.stringify(jsonData);
//console.log(data);

jsonData.map((data, index) => {
  const newrecommend = new Crawling({
    name: data.과목명,
    lectureId: data.학수번호,
    classification: data.이수구분,
    area: data.선택영역,
    credit: data.학점,
    recommendNumber: data.수강횟수
  });
   // console.log(newrecommend);
    try {
      newrecommend.save();
    } catch (err) {
       console.log(err);
    }
});