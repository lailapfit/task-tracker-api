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
    createTask(knex, data) {
        return knex('tasks').returning('*').insert(data);
    },
    updateTaskProjectByTaskId(knex, taskId, data) {
        return knex('tasks').where({ id: `${taskId}`}).update(data, ['id', 'description', 'project_id']);
    },
    deleteTaskByTaskId(knex, taskId) {
        return knex('tasks').where({ id: `${taskId}`}).del();
    }
}

module.exports = TaskService;