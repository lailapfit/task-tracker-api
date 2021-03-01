const CustomerService = {
    getAllCustomers(knex) {
        return knex.select('*').from('customers');
    },
    getCustomerByName(knex, name) {
        return knex.select('*').from('customers').first().where({ name: `${name}`});
    },
    getCustomerById(knex, id) {
        return knex.select('*').from('customers').first().where({ id: `${id}`});
    },
    createCustomer(knex, data) {
        return knex('customers').returning('id').insert({ name: `${data.name}`});
    },
    updateCustomerByName(knex, name, data) {
        return knex('customers').where({ name: `${name}`}).update({ name: `${data.name}`}, ['id', 'name']);
    },
    updateCustomerById(knex, id, data) {
        return knex('customers').where({ id: `${id}`}).update({ name: `${data.name}`}, ['id', 'name']);
    },
    deleteCustomerByName(knex, name) {
        return knex('customers').where({ name: `${name}`}).del();
    },
    deleteCustomerById(knex, id) {
        return knex('customers').where({ id: `${id}`}).del();
    }
}

module.exports = CustomerService;