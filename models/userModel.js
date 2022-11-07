const mongoose = require("mongoose");
// const validator = require('validator');
// a
const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "학번이 필요합니다"],
    minlength: 2,
    maxlength: 50,
    default: 0,
  },
  name: {
    type: String,
    required: [true, "학생이름이 필요합니다"],
    minlength: 2,
    unique:false,
    default: 0,
  },
  password: {
    type: String,
    required: [true, "비밀번호가 필요합니다"],
  },
  userGrade: {
    type: Number,
    required: [true, "학년이 필요합니다"],
    default: 0,
  },
  major: {
    type: String,
    required: [true, "전공이 필요합니다"],
    minlength: 2,
    maxlength: 50,
    default: 0,
  },
  takenLectures: {
    type: String,
    default: 0,
  },
  doubleMajor: {
    type: String,
    default: 0,
  },
  totalCredits: {
    type: String,
    default: 0,
  },
  majorCredits: {
    type: String,
    default: 0,
  },
  GE1: {
    //사상과 역사
    type: Boolean,
    default: false,
  },
  GE2: {
    //사회와 문화
    type: Boolean,
    default: false,
  },
  GE3: {
    //세계와 지구촌
    type: Boolean,
    default: false,
  },
  GE4: {
    //예술과 체육
    type: Boolean,
    default: false,
  },
  GE5: {
    //자연과 과학기술
    type: Boolean,
    default: false,
  },
  GE6: {
    //자기계발과 진로/융합과 창업
    type: Boolean,
    default: false,
  },
});

userSchema.virtual("year").get(function () {
  return this.userId.slice(0, 2);
});

const User = mongoose.model("User", userSchema);


module.exports = User;
