const mongoose = require('mongoose');
// const validator = require('validator');

const crawlingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '강의명이 필요합니다'],
      minlength: 2,
      maxlength: 50
    },
    lectureId: {
      type: String,
      required: [true, '학수번호가 필요합니다'],
      minlength: 2,
      maxlength: 50
    },
    classification: {//이수구분
      type: String,
      required: [true, '이수구분이 필요합니다'],
    },
    area: { //선택영역
        type: String,
        required: [true, '선택영역이 필요합니다'],
      },
    credit: {//학점
      type: String,
      required: [true, '학점이 필요합니다'],
      default: 0
    },
    recommendNumber: {
      type: Number,
      required: [true, '수강횟수가 필요합니다'],
      default: 0
    }
  });
const Crawling = mongoose.model('Crawling', crawlingSchema);

module.exports = Crawling;
module.exports.crawlingSchema = crawlingSchema;
