const mongoose = require("mongoose");
const { lectureSchema } = require("./lectureModel");
// const validator = require('validator');

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: [true, "유저 id가 필요합니다."],
  },
  scheduleId: {
    type: Number,
    required: [true, "시간표 id가 필요합니다."],
  },
  totalCredit: {
    type: Number,
    default: 0,
  },
  schedule: {
    type: [lectureSchema],
    required: [true, "시간표가 필요합니다."],
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
