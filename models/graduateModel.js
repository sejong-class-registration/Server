const mongoose = require("mongoose");
// const validator = require('validator');

const graduationSchema = new mongoose.Schema({// 이수해야되는
  year: {
    type: String,
    required: [true, "입학년도가 필요합니다"],
    minlength: 2,
    maxlength: 50,
    default: 0,
  },
  major: {
    type: String,
    required: [true, "전공이 필요합니다"],
    minlength: 2,
    maxlength: 50,
    default: 0,
  },

  totalCredits: { //총학점
    type: Number,
    default:0
  },
  TotalmajorCredits: { //전공총학점
    type: Number, 
    default:0
  },
  requiredMajorCredits: { // 전필학점
    type: Number,
    default:0
  },
  requiredMajorCourses:{// 전필과목
    type: String,
    default:0
  },
  selectiveMajorCredits: {// 전선학점
    type: Number,
    default: 0
  },
  selectiveGECredits: {// 교선학점
    type: Number,
    default: 0
  },
  requiredSelectiveGECourses:{// 필수이수 교양선택과목
    type: String,
    default:0
  },
  selctiveGEPartCondition: { //교양선택 영역 조건
    type: Boolean,
    default: false
  },
  commonRequiredGECoureses: {//공통필수교양
    type: String,
    default: 0,
  },
  academicBasicEduCourses: {//학문기초교양
    type: String,
    default: 0,
  }
});

const Graduation = mongoose.model("Graduation", graduationSchema);
module.exports = Graduation;

