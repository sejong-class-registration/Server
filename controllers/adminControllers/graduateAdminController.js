const Graduation = require("../../models/graduateModel");

const errorGenerator = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const sorting = (query) => {
  query = query.sort({ year: -1 });
  return query;
};

const getSomeGraduation = async (req, res) => {
  try {
    const query = await sorting(Graduation.find(req.query), req.query);

    res.status(200).json({
      status: "success",
      results: query.length,
      data: { graduation: query },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteGraduation = async (req, res, next) => {
  try {
    const { graduationYear = null } = req.body;
    const data = await Graduation.findOne({ year: graduationYear });
    if (!data) errorGenerator("존재하지 않습니다", 203);
    await Graduation.deleteMany({ year: graduationYear }).then(() => {
      res
        .status(201)
        .json({ status: "Succes", message: "졸업요건이 삭제되었습니다." });
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { deleteGraduation, getSomeGraduation };
