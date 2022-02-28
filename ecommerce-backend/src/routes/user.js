const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/signup', (req, res) => {
    console.log(res)
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            if(user) {
                return res.status(400).json({
                        message: 'Email already exist'
                    })
            }
            const {firstName, lastName, email, password} = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });
            _user.save(error, data => {
                if(error) {
                    return res.status(400).json({
                            message: 'Something went wrong'
                        })
                }
                if(data) {
                    return res.status(201).json({
                        user: data,
                        message: 'User created successfully'
                    });
                }
            })
        })
});

router.post('/signin', (req, res) => {
res.status(200).json({'pl': res.body})
})

module.exports = router;

