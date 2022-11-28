const mongoose = require("mongoose");
// const validator = require('validator');

const graduationSchema = new mongoose.Schema(
  {
    // 이수해야되는
    year: {
      type: String,
      required: [true, "입학년도가 필요합니다"],
      minlength: 2,
      maxlength: 50,
      default: 0
    },
    major: {
      type: String,
      required: [true, "전공이 필요합니다"],
      minlength: 2,
      maxlength: 50,
      default: 0
    },

    totalCredits: {
      //총학점
      type: Number,
      default: 0
    },
    mustMajorCredits: {
      //전공총학점
      type: Number,
      default: 0
    },
    selectiveMajorCredits: {
      type: Number,
      default: 0
    },
    공통교양필수과목: {
      type: [String],
      default: []
    },
    공통교양필수학점 :{
      type: Number,
      default: 0
    },
    균형교양필수영역: {
      type: [String],
      default: []
    },
    균형교양필수학점: {
      type: Number,
      default: 0
    },
    교양선택필수과목: {
      type: [String],
      default: []
    },
    학문기초교양필수과목: {
      type: [String],
      default: []
    },
    학문기초교양필수학점: {
      type: Number,
      default: 0
    }
    // requiredCourses:{// 필수이수과목
    //   type: String,
    //   default:0
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

graduationSchema.virtual("selectiveAreaCount").get(function () {
  if (this.year === "2022") return 2;
  else return 3;
});

const Graduation = mongoose.model("Graduation", graduationSchema);
module.exports = Graduation;
