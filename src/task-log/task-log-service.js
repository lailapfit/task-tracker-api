//.join('contacts', 'users.id', '=', 'contacts.user_id')


const TaskLogService = {
    getAllTaskLogs(knex) {
        return knex.select(knex.raw('task_logs.id AS task_log_id, task_logs.task_id, tasks.description AS task_description, users.id AS user_id, users.email AS user_email, task_logs.duration_minutes, tasks.project_id, projects.name AS project_name'))
        .from('task_logs')
        .innerJoin('users', 'users.id', '=', 'task_logs.user_id')
        .innerJoin('tasks', 'tasks.id', '=', 'task_logs.task_id')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
    },
    getTaskLogById(knex, id) {
        return knex.select(knex.raw('task_logs.id AS task_log_id, task_logs.task_id, tasks.description AS task_description, users.id AS user_id, users.email AS user_email, task_logs.duration_minutes, tasks.project_id, projects.name AS project_name'))
        .from('task_logs')
        .first()
        .innerJoin('users', 'users.id', '=', 'task_logs.user_id')
        .innerJoin('tasks', 'tasks.id', '=', 'task_logs.task_id')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
        .where('task_logs.id', '=', id);
    },
    getTaskLogsByTaskId(knex, taskId) {
        return knex.select(knex.raw('task_logs.id AS task_log_id, task_logs.task_id, tasks.description AS task_description, users.id AS user_id, users.email AS user_email, task_logs.duration_minutes, tasks.project_id, projects.name AS project_name'))
        .from('task_logs')
        .innerJoin('users', 'users.id', '=', 'task_logs.user_id')
        .innerJoin('tasks', 'tasks.id', '=', 'task_logs.task_id')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
        .where('task_id', '=', taskId);
    },
    getTaskLogsByUserId(knex, userId) {
        return knex.select(knex.raw('task_logs.id AS task_log_id, task_logs.task_id, tasks.description AS task_description, users.id AS user_id, users.email AS user_email, task_logs.duration_minutes, tasks.project_id, projects.name AS project_name'))
        .from('task_logs')
        .innerJoin('users', 'users.id', '=', 'task_logs.user_id')
        .innerJoin('tasks', 'tasks.id', '=', 'task_logs.task_id')
        .innerJoin('projects', 'tasks.project_id', '=', 'projects.id')
        .where('user_id', '=', userId);
    },
    createTaskLog(knex, task_id, user_id, duration_minutes) {
        return knex('task_logs').returning('id').insert({ task_id: `${task_id}`, user_id: `${user_id}`, duration_minutes: `${duration_minutes}`});
    },
    updateTaskLogById(knex, id, data) {
        return knex('task_logs').where({ id: `${id}`}).update({ task_id: `${data.task_id}`, user_id: `${data.user_id}`, duration_minutes: `${data.duration_minutes}`}, ['id', 'task_id', 'user_id', 'duration_minutes']);
    },
    deleteTaskLogById(knex, id) {
        return knex('task_logs').where({ id: `${id}`}).del();
    }
}

module.exports = TaskLogService;