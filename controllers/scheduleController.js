const Schedule = require('../models/scheduleModel');

exports.getUserSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find(req.query);
    res.status(200).json({
      status: 'success',
      results: schedules.length,
      data: { schedules }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

exports.postUserSchedules = async (req, res) => {
  try {
    console.log(req.body);
    const newSchedule = await Schedule.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        schedule: newSchedule
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

