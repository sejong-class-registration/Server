const Xlsx = require("xlsx");
const Lecture = require("./models/lectureModel");
const excelFile = Xlsx.readFile("./public/node_excel.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

//console.log(jsonData);

 //const data = JSON.stringify(jsonData);

jsonData.map((data) => {
  const newLecture = new Lecture({
    name: data.__EMPTY_3,
    lecture_id: data.__EMPTY_1,
    distrib: data.__EMPTY_2,
    classification: data.__EMPTY_5, 
    english: data.__EMPTY_4,
    credit: data.__EMPTY_7,
    lecture_grade: data.__EMPTY_8,
    department: data.__EMPTY,
    prof_name: data.__EMPTY_11,
    room: data.__EMPTY_13,
    day_and_time:data.__EMPTY_12,
    credit_exchange:data.__EMPTY_16,
    notice:data.__EMPTY_17
  });
  console.log(newLecture);
  newLecture.save();
});
