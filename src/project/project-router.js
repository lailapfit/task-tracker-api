const express = require('express');
const projectRouter = express.Router();

projectRouter
.route('/')
.get((req, res, next) => {
    res.send('project', { title: 'Express'})
});

module.exports = projectRouter;