const Lecture = require("../models/lectureModel");

const errorGenerator = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const sorting = (query, queryString) => {
  if (queryString.sort) {
    query = query.sort(queryString.sort);
  }
  return query;
};

exports.getLectures = async (req, res) => {
  try {
    const query = await sorting(Lecture.find(req.query), req.query);

    res.status(200).json({
      status: "success",
      results: query.length,
      data: { lectures: query },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteLectures = async (req, res) => {
  try {
    const { lectureYear = null, lectureSemster = null } = req.body;
    const data = await Lecture.findOne(
      { year: lectureYear } && { semester: lectureSemster }
    );
    if (!data) errorGenerator("존재하지 않습니다", 203);
    await Lecture.deleteMany(
      { year: lectureYear } && { semster: lectureSemster }
    ).then(() => {
      res
        .status(201)
        .json({ status: "Succes", message: "시간표가 삭제되었습니다." });
    });
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: "fail",
      message: err.message,
    });
  }
};
