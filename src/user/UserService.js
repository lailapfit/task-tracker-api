const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const User = {
    createUser(knex, email, password) {
        return knex('users').returning('id').insert({ email: `${email}`, password: `${password}`});
    },
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET, function(err, data) {
                if (err) {
                    reject(err);
                }
                console.log('data: ' + JSON.stringify(data));
                console.log('dataid: ' + data.id)
                resolve(data.id);
            })
        })
    },
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            console.log('hashPassword in: ' + password);
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log('hashPassword err: ' + err);
                    reject(err);
                } else {
                    console.log('hashPassword hash: ' + hash);
                    resolve(hash);
                }
            })
        })
    },
    createToken() {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    },
    getUser(knex, email) {
        return knex.select('*').from('users').first().where({ email: `${email}`})
    },
    getUserById(knex, id) {
        return knex.select('*').from('users').where({ id: `${id}`})
    },
    checkPassword(password, userPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, userPassword, (err, data) => {
                if (err) {
                    console.log('checkPassword err: ' + err);
                    reject(err);
                } else if (data) {
                    resolve(data);
                } else {
                    reject(new Error('Password do not match, please try again.'));
                }
            })
        })
    },
    updateToken(knex, id) {
        let token = jwt.sign({ id: id }, SECRET, {
            expiresIn: 86400 //24hrs
        });
        return knex('users').where({ id: `${id}`}).update({ token: `${token}`}, ['id', 'email'])
    },
    authenticate(knex, user) {
        this.getToken(knex, user)
        .then(userLogin => {
            userLogin.email === user.email ? true : false;
        })
    },
    getToken(knex, token) {
        return knex.select('*').from('users').where({ token: `${token}`});
    }
}

module.exports = User;