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
        required: [true, '학수번호가 필요합니다'],
        minlength: 2,
        maxlength: 50
      },
    distrib: {//분반
        type: String,
        required: [true, '분반이 필요합니다'],
        default: 0 
      },
    classification:{//이수구분
        type: String,
        required:  [true, '이수구분이 필요합니다'],
      },
    english: {
        type: Boolean,
        default:false
      },
    credit: {//학점
        type: String,
        required: [true, '학점이 필요합니다'],
        default: 0
      },
    lecture_grade: {//학년
        type: Number,
        required: [true, '학년이 필요합니다'],
        default: 0
    },
    department: { //개설학과전공
        type: String,
        required: [true, '개설학과가 필요합니다'],
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
        maxlength: 50
      },
    recommend: {
        type: Boolean,
        default:false
      },
    day_and_time: {
      type: String,
      },
    credit_exchnage:{//학점교류가능여부
      type: String,
      default: 'N'

    },
    notice:{//수강대상및유의사항
        type: String
    }
  });
const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
