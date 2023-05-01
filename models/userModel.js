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
    unique: false,
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
    default: "",
  },
  takenLectures: {
    type: [
      {
        name: String,
        credit: Number,
      },
    ],
    default: [],
  },
  takenGE1: {
    type: [
      {
        name: String,
        credit: Number,
      },
    ],
    default: [],
  },
  takenGE2: {
    type: [
      {
        name: String,
        credit: Number,
      },
    ],
    default: [],
  },
  takenGE3: {
    type: [
      {
        name: String,
        credit: Number,
      },
    ],
    default: [],
  },
  doubleMajor: {
    type: String,
    default: "",
  },
  totalCredits: {
    type: Number,
    default: 0,
  },
  recommendLecture: {
    type: [
      {
        name: String,
        comment: String,
      },
    ],
    default: [],
  },
  majorCredits: {
    type: Number,
    default: 0,
  },
  majorMustCredit: {
    type: Number,
    default: 0,
  },
  majorSelectCredit: {
    type: Number,
    default: 0,
  },
  mustMajorTaken: {
    type: [String],
    default: [],
  },
  selectMajorTaken: {
    type: [String],
    default: [],
  },
  geArea: {
    type: [String],
    default: [],
  },
  geAreaTaken: {
    type: [String],
    default: [],
  },
  geAreaTakenCredit: {
    type: Number,
    default: 0,
  },
  memo: [
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 1,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 2,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 3,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 4,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 5,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 6,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 7,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 8,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 9,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 10,
      },
    },
    {
      content: {
        type: [String],
        required: true,
      },
      semester: {
        type: String,
        default: 11,
      },
    },
  ], // 메모장 필드 추가
});

userSchema.virtual("year").get(function () {
  return "20" + this.studentId.slice(0, 2);
});
userSchema.virtual("geAreaPass").get(function () {
  if (this.studentId.slice(0, 2) * 1 < 22) {
    if (this.geAreaTaken.length <= 3) return true;
    else return false;
  } else {
    if (this.geAreaTaken.length <= 4) return true;
    else return false;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
