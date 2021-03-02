const express = require('express');
const projectRouter = express.Router();
const Project = require('./project-service');

projectRouter
.route('/')
.get((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    Project.getAllProjects(req.app.get('db'))
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllProjects'}});
    })
})
.post((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    Project.createProject(req.app.get('db'), req.body)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be created'}
            });
        }
        res.json({ project_id: project });
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'createProject'}});
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
        return res.status(500).json({error: {message: err, detail: 'getProjectById'}});
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
        return res.status(500).json({error: {message: err, detail: 'updateProjectById'}});
    })
})
.delete((req, res) => {
    Project.deleteProjectById(req.app.get('db'), req.params.id)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be deleted'}
            });
        }
        res.status(200).send('Project successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'deleteProjectById'}});
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
        return res.status(500).json({error: {message: err, detail: 'getProjectByName'}});
    })
})
.put((req, res) => {
    Project.updateProjectByName(req.app.get('db'), req.params.name, req.body)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be updated'}
            });
        }
        res.json(project);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'updateProjectByName'}});
    })
})
.delete((req, res) => {
    Project.deleteProjectByName(req.app.get('db'), req.params.name)
    .then(project => {
        if (!project) {
            return res.status(404).json({
                error: {message: 'Project cannot be deleted'}
            });
        }
        res.status(200).send('Project successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'deleteProjectByName'}});
    })
})

module.exports = projectRouter;