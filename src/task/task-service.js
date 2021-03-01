const TaskService = {
    getAllTasks(knex) {
        return knex.select(knex.raw('tasks.id AS task_id, tasks.description AS task_description, tasks.project_id, projects.name AS project_name, projects.customer_id, customers.name AS customer_name'))
        .from('tasks')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
        .innerJoin('customers', 'customers.id', '=', 'projects.customer_id');
    },
    getTaskByDescription(knex, description) {
        return knex.select(knex.raw('tasks.id AS task_id, tasks.description AS task_description, tasks.project_id, projects.name AS project_name, projects.customer_id, customers.name AS customer_name'))
        .from('tasks')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
        .innerJoin('customers', 'customers.id', '=', 'projects.customer_id')
        .where('tasks.description', 'like', `%${description}%`);
    },
    getTaskById(knex, id) {
        return knex.select(knex.raw('tasks.id AS task_id, tasks.description AS task_description, tasks.project_id, projects.name AS project_name, projects.customer_id, customers.name AS customer_name'))
        .from('tasks')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
        .innerJoin('customers', 'customers.id', '=', 'projects.customer_id')
        .first()
        .where('tasks.id', '=', id);
    },
    getTaskByProjectId(knex, projectId) {
        return knex.select(knex.raw('tasks.id AS task_id, tasks.description AS task_description, tasks.project_id, projects.name AS project_name, projects.customer_id, customers.name AS customer_name'))
        .from('tasks')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
        .innerJoin('customers', 'customers.id', '=', 'projects.customer_id')
        .where('tasks.project_id','=', projectId);
    },
    createTask(knex, description, project_id) {
        return knex('tasks').returning('id').insert({ description: `${description}`, project_id: `${project_id}`});
    },
    updateTaskDescriptionById(knex, id, data) {
        return knex('tasks').where({ id: `${id}`}).update({ description: `${data}`}, ['id', 'description', 'project_id']);
    },
    updateTaskDescriptionByProjectId(knex, projectId, data) {
        return knex('tasks').where({ project_id: `${projectId}`}).update({ description: `${data}`}, ['id', 'description', 'project_id']);
    },
    updateTaskProjectByTaskId(knex, taskId, data) {
        return knex('tasks').where({ id: `${taskId}`}).update({ project_id: `${data}`}, ['id', 'description', 'project_id']);
    },
    deleteTaskByTaskId(knex, taskId) {
        return knex('tasks').where({ id: `${taskId}`}).del();
    },
    deleteTaskByProjectId(knex, projectId) {
        return knex('tasks').where({ project_id: `${projectId}`}).del();
    }
}

module.exports = TaskService;