const express = require('express');
const taskRouter = express.Router();
const Task = require('./task-service');

taskRouter
.route('/')
.get((req, res) => {
    Task.getAllTasks(req.app.get('db'))
    .then(tasks => {
        res.json(tasks);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllTasks'}});
    })
})
.post((req, res) => {
    Task.createTask(req.app.get('db'), req.body)
    .then(task => {
        if (!task) {
            return res.status(404).json({
                error: {message: 'Task cannot be created'}
            });
        }
        res.json({ task_id: task });
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'createTask'}});
    })
})

taskRouter
.route('/task-id/:taskid')
.get((req, res) => {
    Task.getTaskById(req.app.get('db'), req.params.taskid)
    .then(task => {
        if (!task) {
            return res.status(404).json({
                error: {message: 'Task does not exist'}
            });
        }
        res.json(task);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getTaskById'}});
    })
})
.put((req, res) => {
    Task.updateTaskProjectByTaskId(req.app.get('db'), req.params.taskid, req.body)
    .then(task => {
        if (!task) {
            return res.status(404).json({
                error: {message: 'Task cannot be updated'}
            });
        }
        res.json(task);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'updateTaskProjectByTaskId'}});
    })
})
.delete((req, res) => {
    Task.deleteTaskByTaskId(req.app.get('db'), req.params.taskid)
    .then(task => {
        if (!task) {
            return res.status(404).json({
                error: {message: 'Task cannot be updated'}
            });
        }
        res.status(200).send('Task successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'deleteTaskByTaskId'}});
    })
})

taskRouter
.route('/project-id/:projectid')
.get((req, res) => {
    Task.getTaskByProjectId(req.app.get('db'), req.params.projectid)
    .then(task => {
        if (!task) {
            return res.status(404).json({
                error: {message: 'Task does not exist'}
            });
        }
        res.json(task);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getTaskByProjectId'}});
    })
})

taskRouter
.route('/description/:description')
.get((req, res) => {
    Task.getTaskByDescription(req.app.get('db'), req.params.description)
    .then(task => {
        if (!task) {
            return res.status(404).json({
                error: {message: 'Task does not exist'}
            });
        }
        res.json(task);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getTaskByDescription'}});
    })
})

module.exports = taskRouter;