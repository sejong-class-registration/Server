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
  const isRange = (x, min, max) => {
    return ((x - min) * (x - max) < 0);
  }
  try {
    const { userId, scheduleId } = req.body;
    const currentLecture = await Lecture.findById(req.params.id);
    const currentSchedule = await Schedule.findOne({ userId, scheduleId });
    if (!currentSchedule) {
      const newSchedule = await Schedule.create({
        userId,
        scheduleId,
        totalCredit: currentLecture.credit[0] * 1,
        schedule: [currentLecture]
      });
      res.status(201).json({
        status: 'success',
        data: {
          schedule: newSchedule
        }
      });
      return;
    }
    const totalCredit = currentSchedule.totalCredit;
    const scheduleArray = currentSchedule.schedule;
    let currentLectureStartTime = null;
    let currentLectureEndTime = null;
    let currentLectureDay = null;
    let currnetLectureCredit = 0;

    if (currentLecture.dayAndTime.length === 12) {
      currentLectureStartTime = currentLecture.dayAndTime.slice(1, 6);
      currentLectureEndTime = currentLecture.dayAndTime.slice(7, 12);
      currentLectureDay = [currentLecture.dayAndTime[0]];
    } else if (currentLecture.dayAndTime.length === 13) {
      currentLectureStartTime = currentLecture.dayAndTime.slice(2, 7);
      currentLectureEndTime = currentLecture.dayAndTime.slice(8, 13);
      currentLectureDay = [currentLecture.dayAndTime[0], currentLecture.dayAndTime[1]];
    }

    scheduleArray.forEach((lecture) => {
      let startTime = null;
      let endTime = null;
      let day = null;
      let lectureStartTime = 0;
      let lectureEndTime = 0;
      if (lecture.dayAndTime.length === 12) {
        startTime = lecture.dayAndTime.slice(1, 6);
        endTime = lecture.dayAndTime.slice(7, 12);
        day = [lecture.dayAndTime[0]];
      } else if (lecture.dayAndTime.length === 13) {
        startTime = lecture.dayAndTime.slice(2, 7);
        endTime = lecture.dayAndTime.slice(8, 13);
        day = [lecture.dayAndTime[0], lecture.dayAndTime[1]];
      }

      if(lecture.lectureId === currentLecture.lectureId){
        throw({code: 301, message: '이미 같은 강의가 시간표에 존재합니다.'});
      }

      if (day.includes(currentLectureDay[0]) || day.includes(currentLectureDay[-1])) {
        startTime = startTime.slice(0, 2) * 60 + startTime.slice(3, 5) * 1;
        endTime = endTime.slice(0, 2) * 60 + endTime.slice(3, 5) * 1;
        lectureStartTime = currentLectureStartTime.slice(0, 2) * 60 + currentLectureStartTime.slice(3, 5) * 1;
        lectureEndTime = currentLectureEndTime.slice(0, 2) * 60 + currentLectureEndTime.slice(3, 5) * 1;
        if (isRange(lectureStartTime, startTime, endTime)) {
          throw ({code: 302, message: '시간표의 시간과 겹칩니다.'});
        } else if (isRange(lectureEndTime, startTime, endTime)) {
          throw ({code: 302, message: '시간표의 시간과 겹칩니다.'});
        } else if (lectureStartTime < startTime && lectureEndTime > endTime) {
          throw ({code: 302, message: '시간표의 시간과 겹칩니다.'});
        }
      }
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
    res.status(err.code || 400).json({
      status: 'fail',
      message: err.message
    });
  }
}