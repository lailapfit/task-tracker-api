const TaskService = {
    getAllTasks(knex) {
        return knex.select('*').from('tasks');
    },
    getTaskByDescription(knex, description) {
        return knex.select('*').from('tasks').where('description', 'like', `%${description}%`);
    },
    getTaskById(knex, id) {
        return knex.select('*').from('tasks').first().where({ id: `${id}`});
    },
    getTaskByProjectId(knex, projectId) {
        return knex.select('*').from('tasks').where({ project_id: `${projectId}`});
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