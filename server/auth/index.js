const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt');
const salt = 10


const db = require('../db/config');
const users = db.get('users');
users.createIndex('username', { unique: true });



const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .required()
        .pattern(/^[a-zA-z0-9]{3,30}$/)
})


router.get('/', (req, res) => {
    res.json({
        message: "ok from router"
    })
})





router.post('/register', (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error == null) {
        users.findOne({
            username: req.body.username
        }).then(user => {
            //user already exist
            if (user) {
                const err = new Error('Username exist');
                next(err)
            } else {
                bcrypt.hash(req.body.password, salt)
                    .then(hashedPassword => {
                        const newUser = {
                            username: req.body.username,
                            password: hashedPassword
                        }
                        users.insert(newUser).then(addedUser => {
                            res.json(addedUser)
                        })
                    })
            }
        })

    } else {
        res.json(result.err)
    }
})





router.post('/login', (req, res, next) => {

})
module.exports = router

