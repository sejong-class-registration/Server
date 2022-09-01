const mongoose = require('mongoose');
// const validator = require('validator');

const lectureSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        maxlength: 50
      },
    lecture_id: {
        type: String,
        maxlength: 50
      },
    distrib: {//분반
        type: String,
        default: 0 
      },
    classification:{//이수구분
        type: String,
      },
    english: {
        type: String,
        default:""
      },
    credit: {//학점
        type: String,
        default: 0
      },
    lecture_grade: {//학년
        type: String,
        default: 0
    },
    department: { //개설학과전공
        type: String,
        maxlength: 50
      }, 
    prof_name: {
        type: String,
        default: "미정",
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
