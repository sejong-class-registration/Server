const mongoose = require("mongoose");
// const validator = require('validator');

const lectureSchema = new mongoose.Schema(
  {
    year: {
      type: String,
    },
    semester: {
      type: String,
    },
    name: {
      type: String,
      default: "미정",
      required: [true, "강의명이 필요합니다"],
      minlength: 2,
      maxlength: 50,
    },
    lectureId: {
      type: String,
      default: "미정",
      required: [true, "학수번호가 필요합니다"],
      minlength: 2,
      maxlength: 50,
    },
    distrib: {
      //분반
      type: String,
      required: [true, "분반이 필요합니다"],
      default: 0,
    },
    classification: {
      //이수구분
      type: String,
      default: "미정",
      required: [true, "이수구분이 필요합니다"],
    },
    english: {
      type: String,
      default: "",
    },
    credit: {
      //학점
      type: String,
      required: [true, "학점이 필요합니다"],
      default: 0,
    },
    lectureGrade: {
      //학년
      type: String,
    },
    department: {
      //개설학과전공
      type: String,
      maxlength: 50,
    },
    profName: {
      type: String,
      default: "미정",
      maxlength: 50,
    },
    room: {
      type: String,
      default: "미정",
      maxlength: 50,
    },
    recommend: {
      type: String,
      default: "미정",
    },
    dayAndTime: {
      type: String,
      default: "미정",
    },
    creditExchange: {
      //학점교류가능여부
      type: String,
      default: "N",
    },
    notice: {
      //수강대상및유의사항
      type: String,
      default: "미정",
    },
    area: {
      type: String,
      default: "미정",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

lectureSchema.virtual("time").get(function () {
  const length = this.dayAndTime.length;
  const time = this.dayAndTime;
  let startTime = time.slice(length - 11, length - 6);
  let endTime = time.slice(length - 5, length);
  let day;

  if (length === 12) {
    day = [time[0]];
  } else if (length === 13) {
    day = [time[0], time[1]];
  } else if (length === 16) {
    day = [time[0], time[1], time[2], time[3], time[4]];
  } else {
    day = [];
  }

  startTime = startTime.slice(0, 2) * 60 + startTime.slice(3, 5) * 1;
  endTime = endTime.slice(0, 2) * 60 + endTime.slice(3, 5) * 1;

  return { startTime, endTime, day };
});
const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
module.exports.lectureSchema = lectureSchema;
