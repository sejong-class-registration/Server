const Crawling=require("../models/crawlingModel");

exports.getRecommend=async(req,res)=>{
    try {
        var crawlings = await Crawling.find(req.query);
        crawlings.sort((a,b)=>{
          if(a.recommendNumber>b.recommendNumber) return -1;
        });
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