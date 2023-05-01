const mongoose = require("mongoose");
// const validator = require('validator');

const memoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
  },
});

const Memo = mongoose.model("Memo", memoSchema);
module.exports = Memo;
module.exports.memoSchema = memoSchema;
