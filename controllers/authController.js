const User = require('../models/userModel');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")


////signup
const createUserData = async(userInput)=>{
    const user = await encodedUser(userInput);
    return user.save();
}
const encodedUser = async({
    name,
    studentId,
    password,
    userGrade,
    major,
    takenLectures,
    doubleMajor
}) => {
    const hashedPass = await bcrypt.hash(password,12);
    const user =new User({
        name,
        studentId,
        password: hashedPass,
        userGrade,
        major,
        takenLectures,
        doubleMajor
    });
    return user;
};
const errorGenerator = (message, statusCode = 500) => { 
    const error = new Error(message); 
    error.statusCode = statusCode;
    throw error;
  };
const signUp = async (req, res, next) => { 
  try {
    const { studentId } = req.body; 
    const user = await User.findOne({ studentId }); 
    if (user) errorGenerator("이미 등록된 회원입니다", 404); 
  
    await createUserData(req.body); 
    res.status(200).json({ message: "User created" }); 
  } catch (err) {
    next(err); 
  }
};  
//const newUser = await User.create(req.body);

////signin
const createToken = (userId) => {
  const token = jwt.sign({ _id: userId.toString() }, SECRET_KEY); 
  return token;
};

const signIn = async (req, res, next) => {
  try {
    const { studentId = null, password = null } = req.body; 
    if (!studentId || !password) errorGenerator("Invalid inputs", 400); 

    const user = await User.findOne({ studentId });

    if (!user) errorGenerator("존재하지 않는 회원입니다", 404); 

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) errorGenerator("비밀번호가 틀렸습니다", 404); 

    const token = createToken(user._id);
    res.status(201).json({ message: "Success", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn };