const express = require('express');
const projectRouter = express.Router();
const Project = require('./project-service');

projectRouter
.route('/')
.get((req, res) => {
    Project.getAllProjects(req.app.get('db'))
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})

projectRouter
.route('/id/:id')
.get((req, res) => {
    Project.getProjectById(req.app.get('db'), req.params.id)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project does not exist'}
            });
        }
        res.json(project);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})
.put((req, res) => {
    Project.updateProjectById(req.app.get('db'), req.params.id, req.body)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be updated'}
            });
        }
        res.json(project);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})
.delete((req, res) => {
    Project.deleteProjectById(req.app.get('db'), req.params.id)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be updated'}
            });
        }
        res.status(200).send('Project successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})

projectRouter
.route('/name/:name')
.get((req, res) => {
    Project.getProjectByName(req.app.get('db'), req.params.name)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project does not exist'}
            });
        }
        res.json(project);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})
.put((req, res) => {
    Project.updateProjectByName(req.app.get('db'), req.params.id, req.body)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be updated'}
            });
        }
        res.json(project);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})
.delete((req, res) => {
    Project.deleteProjectByName(req.app.get('db'), req.params.id)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be updated'}
            });
        }
        res.status(200).send('Project successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})

module.exports = projectRouter;