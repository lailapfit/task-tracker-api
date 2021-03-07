const express = require('express');
const customerRouter = express.Router();
const Customer = require('./customer-service');

customerRouter
.route('/')
.get((req, res) => {
    Customer.getAllCustomers(req.app.get('db'))
    .then(customers => {
        res.json(customers);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllCustomers'}});
    })
})
.post((req, res) => {
    Customer.createCustomer(req.app.get('db'), req.body)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                error: {message: 'Customer cannot be created'}
            });
        }
        res.json(customer);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'createCustomer'}});
    })
})

customerRouter
.route('/id/:id')
.get((req, res) => {
    Customer.getCustomerById(req.app.get('db'), req.params.id)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                error: {message: 'Customer does not exist'}
            });
        }
        res.json(customer);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllCustomers'}});
    })
})
.put((req, res) => {
    Customer.updateCustomerById(req.app.get('db'), req.params.id, req.body)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                error: {message: 'Customer cannot be updated'}
            });
        }
        res.json(customer);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllCustomers'}});
    })
})
.delete((req, res) => {
    Customer.deleteCustomerById(req.app.get('db'), req.params.id)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                error: {message: 'Customer cannot be updated'}
            });
        }
        res.status(200).send('Customer successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllCustomers'}});
    })
})

customerRouter
.route('/name/:name')
.get((req, res) => {
    Customer.getCustomerByName(req.app.get('db'), req.params.name)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                error: {message: 'Customer does not exist'}
            });
        }
        res.json(customer);

    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllCustomers'}});
    })
})
.put((req, res) => {
    Customer.updateCustomerByName(req.app.get('db'), req.params.name, req.body)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                error: {message: 'Customer cannot be updated'}
            });
        }
        res.json(customer);
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getAllCustomers'}});
    })
})
.delete((req, res) => {
    Customer.deleteCustomerByName(req.app.get('db'), req.params.name)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                error: {message: 'Customer cannot be updated'}
            });
        }
        res.status(200).send('Customer successfully deleted');
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'deleteCustomerByName'}});
    })
})

module.exports = customerRouter;