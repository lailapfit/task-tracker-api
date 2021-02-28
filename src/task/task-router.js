const express = require('express');
const taskRouter = express.Router();

taskRouter
.route('/')
.get((req, res, next) => {
    res.send('task', { title: 'Express'})
});

module.exports = taskRouter;