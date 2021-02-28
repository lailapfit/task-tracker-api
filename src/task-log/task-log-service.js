const TaskLogService = {
    getAllTaskLogs(knex) {
        return knex.select('*').from('task_logs');
    },
    getTaskLogById(knex, id) {
        return knex.select('*').from('task_logs').first().where({ id: `${id}`});
    },
    getTaskLogsByTaskId(knex, taskId) {
        return knex.select('*').from('task_logs').where({ task_id: `${taskId}`});
    },
    getTaskLogsByUserId(knex, userId) {
        return knex.select('*').from('task_logs').where({ user_id: `${userId}`});
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