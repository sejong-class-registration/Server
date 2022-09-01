const mongoose = require('mongoose');
// const validator = require('validator');

const lectureSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, '강의명이 필요합니다'],
        minlength: 2,
        maxlength: 50
      },
    lecture_id: {
        type: String,
        required: [true, '학수번호기 필요합니다'],
        minlength: 2,
        maxlength: 50
      },
    distrib: {//분반
        type: String,
        required: [true, '분반이 필요합니다'],
        default: 0 
      },
    english: {
        type: Boolean,
        default:false
      },
    credit: {//학점
        type: Number,
        required: [true, '학점이 필요합니다'],
        default: 0
      },
    lecture_grade: {
        type: Number,
        required: [true, '학년이 필요합니다'],
        default: 0
    },
    department: { //주관학과
        type: String,
        required: [true, '주간학과가 필요합니다'],
        minlength: 2,
        maxlength: 50
      }, 
    prof_name: {
        type: String,
        required: [true, '교수성함이 필요합니다'],
        minlength: 2,
        maxlength: 50
      },
    room: {
        type: String,
        required: [true, '강의실이름이 필요합니다'],
        minlength: 2,
        maxlength: 50
      },
    recommend: {
        type: Boolean,
        default:false
      },
    day_and_time: {      },
    taken_lectures: {
        type: String

      },
    notice:{
        type: String
    }
  });
const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
