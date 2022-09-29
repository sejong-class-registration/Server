const express = require("express");
const lectureRouter = require('./routes/lectureRoute');

const scheduleRouter = require('./routes/scheduleRoute');

const AppError = require('./utils/AppError');

const scheduleRouter = require('./routes/scheduleRoute');
// const userRouter = require('./routes/userRoutes');


const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/lectures', lectureRouter);
app.use('/schedules', scheduleRouter);
app.use('/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} is not found in server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });

});

module.exports = app;
