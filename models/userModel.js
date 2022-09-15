const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, '학생이름이 필요합니다'],
        minlength: 2,
        unique:1
      },
    user_id: {
        type: String,
        required: [true, '학번이 필요합니다'],
        minlength:2,
        maxlength:50
      },
    password: {
        type: String,
        required: [true, '비밀번호가 필요합니다'],
        maxlength:50,
        unique:1
      },
    user_grade: {
        type: Number,
        required: [true, '학년이 필요합니다'],
        default:0
      },
    year_of_admission: {//필요?
        type: Number,
        required: [true, '입학년도가 필요합니다'],
        default: 0
      },
    major: {
        type: String,
        required: [true, '전공이 필요합니다'],
        minlength:2,
        maxlength:50,
      },
    taken_lectures: {
        type: String,

      },
    schedule: {
        type: String,
        required: [true, '시간표가 필요합니다'],
      }
  });
const User = mongoose.model('User', userSchema);

module.exports = User;
