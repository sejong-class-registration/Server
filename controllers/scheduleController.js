const Lecture = require('../models/lectureModel');
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

exports.addLectureOnSchedule = async (req, res) => {
  try {
    const { userId, scheduleId } = req.body;
    const currentLecture = await Lecture.findById(req.params.id);
    const currentSchedule = await Schedule.findOne({ userId, scheduleId });
    const totalCredit = currentSchedule.totalCredit;
    const scheduleArray = currentSchedule.schedule;
    console.log(currentSchedule);
    let currentLectureStartTime = null;
    let currentLectureEndTime = null;
    let currentLectureDay = null;
    let currnetLectureCredit = 0;

    if (currentLecture.day_and_time.length === 12) {
      currentLectureStartTime = currentLecture.day_and_time.slice(1, 6);
      currentLectureEndTime = currentLecture.day_and_time.slice(7, 12);
      currentLectureDay = [currentLecture.day_and_time[0]];
    } else if (currentLecture.day_and_time.length === 13) {
      currentLectureStartTime = currentLecture.day_and_time.slice(2, 7);
      currentLectureEndTime = currentLecture.day_and_time.slice(8, 13);
      currentLectureDay = [currentLecture.day_and_time[0], currentLecture.day_and_time[1]];
    }

    console.log(currentLectureStartTime, currentLectureEndTime, currentLectureDay);

    scheduleArray.forEach((lecture) => {
      let startTime = null;
      let endTime = null;
      let day = null;
      if (lecture.day_and_time.length === 12) {
        startTime = lecture.day_and_time.slice(1, 6);
        endTime = lecture.day_and_time.slice(7, 12);
        day = [lecture.day_and_time[0]];
      } else if (lecture.day_and_time === 13) {
        startTime = lecture.day_and_time.slice(2, 7);
        endTime = lecture.day_and_time.slice(8, 13);
        day = [lecture.day_and_time[0], lecture.day_and_time[1]];
      }
      if (day.includes(currentLectureDay[0]) || day.includes(currentLectureDay[-1])) {
        console.log(1);
      }

      console.log(startTime, endTime, day);
    })

    scheduleArray.unshift(currentLecture);
    const updatedSchedule = await Schedule.findOneAndUpdate(userId, {
      userId,
      scheduleId,
      totalCredit: totalCredit + currnetLectureCredit,
      schedule: scheduleArray
    }, {
      new: true,
      runValidators: true
    });
    res.status(201).json({
      status: 'success',
      data: {
        schedule: updatedSchedule
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}