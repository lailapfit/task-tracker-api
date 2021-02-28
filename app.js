require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//routes
const customerRouter = require('./src/customer/customer-router');
const projectRouter = require('./src/project/project-router');
const taskRouter = require('./src/task/task-router');
const userRouter = require('./src/user/user-router');
const taskLogRouter = require('./src/task-log/task-log-router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/customer', customerRouter);
app.use('/project', projectRouter);
app.use('/task', taskRouter);
app.use('/user', userRouter);
app.use('/task-log', taskLogRouter);

app.get('/', (req, res) => {
    res.send('TASK TRACKER API v1.1.3');
})
app.use(function errorHandler(error, req, res, next) {
    console.error(error)
    let response = { message: error.message, error };
    res.status(500).json(response);
});
  
module.exports = app;

