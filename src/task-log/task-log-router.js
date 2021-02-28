const express = require('express');
const taskLogRouter = express.Router();
const TaskLog = require('./task-log-service');

taskLogRouter
.route('/')
.get((req, res) => {
    TaskLog.getAllTaskLogs(req.app.get('db'))
    .then(tasklogs => {
        res.json(tasklogs);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllTaskLogs'}});
    })
})

taskLogRouter
.route('/id/:id')
.get((req, res) => {
    TaskLog.getTaskLogById(req.app.get('db'), req.params.id)
    .then(taskLog => {
        if (!taskLog) {
            return res.status(404).json({
                error: {message: 'Task log does not exist'}
            });
        }
        res.json(taskLog);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getTaskLogById'}});
    })
})
.put((req, res) => {
    TaskLog.updateTaskLogById(req.app.get('db'), req.params.id, req.body)
    .then(taskLog => {
        if (!taskLog) {
            return res.status(404).json({
                error: {message: 'Task log cannot be updated'}
            });
        }
        res.json(taskLog);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'updateTaskLogById'}});
    })
})
.delete((req, res) => {
    TaskLog.deleteTaskLogById(req.app.get('db'), req.params.id)
    .then(taskLog => {
        if (!taskLog) {
            return res.status(404).json({
                error: {message: 'Task log cannot be updated'}
            });
        }
        res.status(200).send('Task log successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'deleteTaskLogById'}});
    })
})

taskLogRouter
.route('/task-id/:taskid')
.get((req, res) => {
    TaskLog.getTaskLogsByTaskId(req.app.get('db'), req.params.taskid)
    .then(taskLog => {
        if (!taskLog) {
            return res.status(404).json({
                error: {message: 'Task logs does not exist'}
            });
        }
        res.json(taskLog);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getTaskLogsByProjectId'}});
    })
})

taskLogRouter
.route('/user-id/:userid')
.get((req, res) => {
    TaskLog.getTaskLogsByUserId(req.app.get('db'), req.params.userid)
    .then(taskLog => {
        if (!taskLog) {
            return res.status(404).json({
                error: {message: 'Task log does not exist'}
            });
        }
        res.json(taskLog);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getTaskLogsByUserId'}});
    })
})

module.exports = taskLogRouter;