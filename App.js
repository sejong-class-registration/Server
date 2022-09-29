const express = require("express");
const lectureRouter = require('./routes/lectureRoute');
<<<<<<< HEAD
const scheduleRouter = require('./routes/scheduleRoute');
=======

const scheduleRouter = require('./routes/scheduleRoute');
// const userRouter = require('./routes/userRoutes');

>>>>>>> f7053425d8c5659dae365ba3f66a29fa922aa209
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
<<<<<<< HEAD
=======


>>>>>>> f7053425d8c5659dae365ba3f66a29fa922aa209
app.use('/lectures', lectureRouter);
app.use('/schedules', scheduleRouter);
app.use('/users',userRouter);

module.exports = app;
