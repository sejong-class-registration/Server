const Graduation = require('../models/graduateModel');

exports.getGraduation = async (req, res) => {
  try {
    const graduation = await Graduation.findOne(req.query);
    graduation.학문기초교양필수과목.forEach((e)=>{
      console.log(1);
    })
    res.status(200).json({
      status: 'success',
      data: graduation
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}