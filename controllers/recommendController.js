const Crawling=require("../models/crawlingModel");

exports.getRecommend=async(req,res)=>{
    try {
        const crawlings = await Crawling.find(req.query);
        res.status(200).json({
          status: "success",
          data: { crawlings },
        });
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
      }
}