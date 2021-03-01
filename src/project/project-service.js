const ProjectService = {
    getAllProjects(knex) {
        return knex.select(knex.raw('projects.id AS project_id, projects.name AS project_name, customers.id AS customer_id, customers.name AS customer_name'))
        .from('projects')
        .innerJoin('customers', 'customers.id', '=', 'projects.customer_id');
    },
    getProjectByName(knex, name) {
        return knex.select(knex.raw('projects.id AS project_id, projects.name AS project_name, customers.id AS customer_id, customers.name AS customer_name'))
        .from('projects')
        .first()
        .innerJoin('customers', 'customers.id', '=', 'projects.customer_id')
        .where('projects.name', '=', name);
    },
    getProjectById(knex, id) {
        return knex.select(knex.raw('projects.id AS project_id, projects.name AS project_name, customers.id AS customer_id, customers.name AS customer_name'))
        .from('projects')
        .first()
        .innerJoin('customers', 'customers.id', '=', 'projects.customer_id')
        .where('projects.id', '=', id);
    },
    createProject(knex, data) {
        return knex('projects').returning('id').insert(data);
    },
    updateProjectByName(knex, name, data) {
        return knex('projects').where({ name: `${name}`}).update(data, ['id', 'name']);
    },
    updateProjectById(knex, id, data) {
        return knex('projects').where({ id: `${id}`}).update(data, ['id', 'name']);
    },
    deleteProjectByName(knex, name) {
        return knex('projects').where({ name: `${name}`}).del();
    },
    deleteProjectById(knex, id) {
        return knex('projects').where({ id: `${id}`}).del();
    }
}

module.exports = ProjectService;