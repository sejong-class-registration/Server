const Lecture = require("../models/lectureModel");
const Schedule = require("../models/scheduleModel");

exports.getUserSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find(req.query);
    res.status(200).json({
      status: "success",
      results: schedules.length,
      data: { schedules }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.postUserSchedules = async (req, res) => {
  try {
    // console.log(req.body);
    const newSchedule = await Schedule.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        schedule: newSchedule
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.addLectureOnSchedule = async (req, res) => {
  const isRange = (x, min, max) => {
    return (x - min) * (x - max) < 0;
  };
  try {
    const { userId, scheduleId } = req.body;
    console.log(userId, scheduleId);
    const currentLecture = await Lecture.findById(req.params.id);
    const currentSchedule = await Schedule.findOne({ userId, scheduleId });

    // 입력된 userId와 scheduleId로 시간표를 새로 생성할지, 이미 있는 시간표를 수정할지 정함
    if (!currentSchedule) {
      res.status(404).json({
        status: "fail",
        err: "잘못된 요청입니다"
      });
      return;
    }

    const totalCredit = currentSchedule.totalCredit;
    const scheduleArray = currentSchedule.schedule;

    // * 강의별 시간, 요일 추출(문자열 길이로 요일 몇개인지 구분)
    const extractDayAndTime = (length, lecture) => {
      const startTime = lecture.dayAndTime.slice(length - 11, length - 6);
      const endTime = lecture.dayAndTime.slice(length - 5, length);
      const day =
        length === 12
          ? [lecture.dayAndTime[0]]
          : [lecture.dayAndTime[0], lecture.dayAndTime[1]];

      return { startTime, endTime, day };
    };

    const {
      startTime: currentLectureStartTime,
      endTime: currentLectureEndTime,
      day: currentLectureDay
    } = extractDayAndTime(currentLecture.dayAndTime.length, currentLecture);

    const currentLectureCredit = currentLecture.credit[0] * 1;
    console.log(currentLecture.credit[0]);
    if (currentLecture.dayAndTime.length === 0) {
      scheduleArray.unshift(currentLecture);
      const updatedSchedule = await Schedule.findOneAndUpdate(
        { userId, scheduleId },
        {
          userId,
          scheduleId,
          totalCredit: totalCredit + currentLectureCredit,
          schedule: scheduleArray
        }
        // {
        //   new: true,
        //   runValidators: true,
        // }
      );
      console.log(updatedSchedule);

      res.status(201).json({
        status: "success",
        data: {
          schedule: updatedSchedule
        }
      });
      return;
    }

    // 기존의 시간표에 있는 모든 강의들과 요일, 시간 계산
    scheduleArray.forEach((lecture) => {
      let lectureStartTime = 0;
      let lectureEndTime = 0;

      let { startTime, endTime, day } = extractDayAndTime(
        lecture.dayAndTime.length,
        lecture
      );

      if (lecture.lectureId === currentLecture.lectureId) {
        throw { code: 301, message: "이미 같은 강의가 시간표에 존재합니다." };
      }

      if (
        day.includes(currentLectureDay[0]) ||
        day.includes(currentLectureDay[1])
      ) {
        startTime = startTime.slice(0, 2) * 60 + startTime.slice(3, 5) * 1;
        endTime = endTime.slice(0, 2) * 60 + endTime.slice(3, 5) * 1;
        lectureStartTime =
          currentLectureStartTime.slice(0, 2) * 60 +
          currentLectureStartTime.slice(3, 5) * 1;
        lectureEndTime =
          currentLectureEndTime.slice(0, 2) * 60 +
          currentLectureEndTime.slice(3, 5) * 1;

        if (isRange(lectureStartTime, startTime, endTime)) {
          throw { code: 302, message: "시간표의 시간과 겹칩니다." };
        } else if (isRange(lectureEndTime, startTime, endTime)) {
          throw { code: 302, message: "시간표의 시간과 겹칩니다." };
        } else if (lectureStartTime < startTime && lectureEndTime > endTime) {
          throw { code: 302, message: "시간표의 시간과 겹칩니다." };
        } else if (
          lectureStartTime === startTime &&
          lectureEndTime === endTime
        ) {
          throw { code: 302, message: "시간표의 시간과 겹칩니다." };
        }
      }
    });

    scheduleArray.unshift(currentLecture);
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { userId, scheduleId },
      {
        userId,
        scheduleId,
        totalCredit: totalCredit + currentLectureCredit,
        schedule: scheduleArray
      }
      // {
      //   new: true,
      //   runValidators: true,
      // }
    );

    res.status(201).json({
      status: "success",
      data: {
        schedule: updatedSchedule
      }
    });
  } catch (err) {
    res.status(err.code || 400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.deleteLectureOnSchedule = async (req, res) => {
  try {
    const { userId, scheduleId } = req.body;
    const schedule = await Schedule.findOne({ userId, scheduleId });
    const currentLecture = await Lecture.findById(req.params.id);
    const index = schedule.schedule.findIndex((e) =>
      e._id.equals(req.params.id)
    );
    const temp = schedule.schedule;
    console.log(schedule.totalCredit);
    const totalCredit = schedule.totalCredit;
    temp.splice(index, 1);
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { userId, scheduleId },
      {
        userId,
        scheduleId,
        totalCredit: totalCredit - currentLecture.credit[0] * 1,
        schedule: temp
      },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(201).json({
      status: "success",
      data: {
        schedule: updatedSchedule
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
