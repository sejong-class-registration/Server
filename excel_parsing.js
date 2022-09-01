const Xlsx = require("xlsx");
const Lecture = require("./models/lectureModel");
const excelFile = Xlsx.readFile("./public/node_excel.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = Xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

// console.log(jsonData);

// const data = JSON.stringify(jsonData);
// console.log(data);

jsonData.map((data) => {
  const newLecture = new Lecture({
    name: data.__EMPTY_3,
    lecture_id: data.__EMPTY_2,
    
  });
});

