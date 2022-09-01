const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");
const Lecture = require("./models/lectureModel");

// MongoDB 랑 연결 후, config.env 채우고 여기 주석 풀기

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

const db = mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successful!");
  });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });

const newLecture = new Lecture({
  name: 'aaa',
  lecture_id: '1aaaa',
  distrib: '1aaa',
  department: '1aaa',
  prof_name: 'aaa',
  room: 'aaaa',
});

newLecture.save();
