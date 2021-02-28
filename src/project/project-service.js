const ProjectService = {
    getAllProject(knex) {
        return knex.select('*').from('projects');
    },
    getProjectByName(knex, name) {
        return knex.select('*').from('projects').first().where({ name: `${name}`});
    },
    getProjectById(knex, id) {
        return knex.select('*').from('projects').first().where({ id: `${id}`});
    },
    createProject(knex, name) {
        return knex('projects').returning('id').insert({ name: `${name}`});
    },
    updateProjectByName(knex, name, data) {
        return knex('projects').where({ name: `${name}`}).update({ name: `${data}`}, ['id', 'name']);
    },
    updateProjectById(knex, id, data) {
        return knex('projects').where({ id: `${id}`}).update({ name: `${data}`}, ['id', 'name']);
    },
    deleteProjectByName(knex, name) {
        return knex('projects').where({ name: `${name}`}).del();
    },
    deleteProjectById(knex, id) {
        return knex('projects').where({ id: `${id}`}).del();
    }
}

module.exports = ProjectService;