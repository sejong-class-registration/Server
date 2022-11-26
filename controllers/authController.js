const User = require('../models/userModel');
const Schedule=require('../models/scheduleModel');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Crawl= require('../crawl');

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
    doubleMajor
}) => {
    const hashedPass = await bcrypt.hash(password,12);
    const user =new User({
        name,
        studentId,
        password: hashedPass,
        userGrade,
        major,
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
    const check = await Crawl(studentId,password);
    if(!check){
      return res.status(200).json({ status: 'Fail', message: "학교학생이 아닙니다"});;
    }
    let user = await User.findOne({ studentId }); 
    if (user){
      return res.status(202).json({ status: 'Fail', message: "이미 등록된 회원입니다"});; 
    }
    await createUserData(req.body); 
    user = await User.findOne({ studentId }); 
    const token = createToken(user._id);
    res.status(201).json({ message: "User created", token, user}); 
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
    if (!studentId || !password) errorGenerator("Invalid inputs", 404); 

    const user = await User.findOne({ studentId });

    if (!user)errorGenerator("존재하지 않는 회원입니다", 202);

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck)errorGenerator("비밀번호가 틀렸습니다", 203);

    const token = createToken(user._id);
    res.status(201).json({ status: 'Success',token, user});
  } catch (err) {
    next(err);
  }
};
////deleteAccount
const deleteUser =async(req,res,next)=>{
  try{
    const { Id = null, password = null } = req.body; 
    if (!Id || !password) errorGenerator("Invalid inputs", 404); 
    const data=await User.findOne({studentId: Id});
    if(!data) errorGenerator("존재하지 않는 회원입니다", 202);
    const passwordCheck = await bcrypt.compare(password, data.password);
    if (!passwordCheck)errorGenerator("비밀번호가 틀렸습니다", 203);
    await User.deleteOne({studentId: Id})
    await Schedule.deleteMany({userId: Id})
    .then(()=>{
      res.status(200).json({status: 'Succes', message:'회원탈퇴되었습니다'});
    })
  }catch(err){
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
module.exports = { signUp, signIn,deleteUser };