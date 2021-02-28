const express = require('express');
const customerRouter = express.Router();

customerRouter
.route('/')
.get((req, res, next) => {
    res.send('customer', { title: 'Express'})
});

module.exports = customerRouter;