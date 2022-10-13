const User = require('../models/userModel');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crawl= require('../crawl');

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
    const { studentId=null, password=null } = req.body; 
    const check=crawl(studentId,password);
    if(!check) errorGenerator("학교 학생이 아닙니다", 401);
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
  const token = jwt.sign({ _id: userId.toString() }, process.env.SECRETKEY); 
  return token;
};


const signIn = async (req, res, next) => {
  try {
    const { studentId = null, password = null } = req.body; 
    if (!studentId || !password) errorGenerator("Invalid inputs", 400); 

    const user = await User.findOne({ studentId });

    if (!user)res.status(301).json({ status: 'Fail', message: "존재하지 않는 회원입니다"});

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck)res.status(302).json({status: 'Fail', message: "비밀번호가 틀렸습니다"});

    const token = createToken(user._id);
    res.status(201).json({ status: 'Success',token });
  } catch (err) {
    next(err);
  }
};
/////인증 인가 미들웨어 코드
/*module.exports = async (req, res, next) => { 
  try {
    const token = req.get("Authorization"); 

    const decodedToken = jwt.verify(token, SECRET_KEY); 
    const { _id } = decodedToken; 

    const user = await User.findOne({ _id }); 
    if (!user) errorGenerator("Not found User", "404");

    req.user = user; 
    next(); 
  } catch (err) {
    err.message = "Not authenticated"; 
    err.statsuCode = 401; 
    next(err);
  }
};*/
module.exports = { signUp, signIn };