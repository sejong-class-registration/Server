const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const errorGenerator = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};
const createToken = (userId) => {
  const token = jwt.sign({ _id: userId.toString() }, process.env.SECRETKEY);
  return token;
};
const signIn = async (req, res, next) => {
  try {
    const { id = null, password = null } = req.body;
    if (!id || !password) errorGenerator("Invalid inputs", 404);
    if (id != "1234") errorGenerator("존재하지 않는 회원입니다", 202);
    if (password != "yunheegabin21")
      errorGenerator("비밀번호가 틀렸습니다", 203);
    const user = await User.findOne({ id });
    const token = createToken(user._id);
    res.status(201).json({ status: "success", token });
  } catch (err) {
    next(err);
  }
};
module.exports = { signIn };
