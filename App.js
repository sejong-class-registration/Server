const express = require("express");
const lectureRouter = require('./routes/lectureRoute');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/lectures',lectureRouter);
app.use('/users',userRouter);

module.exports = app;
