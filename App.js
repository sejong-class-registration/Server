const express = require("express");
const lectureRouter = require('./routes/lectureRoute');
const scheduleRouter = require('./routes/scheduleRoute');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/lectures', lectureRouter);
app.use('/schedules', scheduleRouter);
app.use('/users',userRouter);

module.exports = app;
