const express = require('express');
const userRouter = express.Router();
const User = require('./UserService');

userRouter
.route('/login')
.post((req, res) => {
    User.getUser(req.app.get('db'), req.body.email)
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: {message: 'User not found'}});
        }
        console.log('getUser user: ' + JSON.stringify(user));

        User.checkPassword(req.body.password, user.password)
        .then(password => {
            if (!password) {
                return res.status(401).send({ auth: false, token: null });
            }

            if (user.token) {
                User.verifyToken(user.token)
                .then(verifiedUser => {
                    console.log('verifiedUserId: ' + verifiedUser);

                    User.updateToken(req.app.get('db'), verifiedUser)
                    .then(updatedUser => {
                        return res.status(200).send({ auth: true, updatedUser });
                    })
                    .catch(updatedError => {
                        return res.status(500).json({error: {message: updatedError, detail: 'updateToken'}});
                    })
                })
                .catch(err => {return res.status(500).json({error: {message: err, detail: 'verifyToken'}});})
            } else {
                User.updateToken(req.app.get('db'), user.id)
                .then(updatedUser => {
                    return res.status(200).send({ auth: true, updatedUser });
                })
                .catch(updatedError => {
                    return res.status(500).json({error: {message: updatedError, detail: 'updateToken'}});
                })
            }
        })
        .catch(error => {return res.status(500).json({error: {message: error, detail: 'checkPassword'}});})
        
    })
    .catch(err => {
        return res.status(500).json({error: {message: err, detail: 'getUser'}});
    })
})

userRouter
.route('/register')
.post((req, res) => {
    User.hashPassword(req.body.password)
    .then(hashed => {
        User.createUser(req.app.get('db'), req.body.email, hashed)
        .then(user => {
            console.log('user: ' + JSON.stringify(user))
            User.updateToken(req.app.get('db'), user)
            .then(updatedUser => {
                return res.status(200).send({ auth: true, token: updatedUser });
            })
            .catch(updatedError => {
                return res.status(500).json({error: {message: updatedError, detail: 'updateToken'}});
            })
        })
        .catch(createUserErr => {
            return res.status(500).json({error: {message: createUserErr, detail: 'createUser'}});
        })
    })
    .catch(err => {
       return res.status(500).json({error: {message: err, detail: 'hashPassword'}});
    })
})

module.exports = userRouter;