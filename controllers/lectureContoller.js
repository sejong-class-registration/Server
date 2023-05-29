const Lecture = require("../models/lectureModel");

const sorting = (query, queryString) => {
  if (queryString.sort) {
    query = query.sort(queryString.sort);
  }
  return query;
};

exports.getAllLectures = async (req, res) => {
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

exports.getSomeLectures = async (req, res) => {
  try {
    const query = await sorting(
      Lecture.find({ year: 2023, semester: "summer", ...req.query }),
      req.query
    );

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
