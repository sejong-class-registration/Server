const Graduation = require("../../models/graduateModel");

const errorGenerator = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};
const findGraduationByMajor = async (req, res) => {
  try {
    const { major } = req.body;

    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
    });

    const graduation = await Graduation.findOne({ major });

    if (!graduation) {
      return res.status(404).json({
        status: "error",
        message: "Graduation data not found for the given major.",
      });
    }

    res.status(200).json({
      status: "success",
      data: graduation,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching graduation data.",
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
module.exports = deleteGraduation;
