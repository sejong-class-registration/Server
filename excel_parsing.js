const Xlsx = require( "xlsx" );
const excelFile = Xlsx.readFile("./public/node_excel.xlsx");
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const jsonData = Xlsx.utils.sheet_to_json(firstSheet,{defval:""});

console.log(jsonData);