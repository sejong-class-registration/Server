const Lecture = require('../models/lectureModel');

exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find(req.query);
    res.status(200).json({
      status: 'success',
      results: lectures.length,
      data: { lectures }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

