const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.signup = (req, res, next) => {
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
                username: Math.random().toString(),
                role: 'admin'
            });
            _user.save((error, data) => {
                if(error) {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    })
                }
                return res.status(201).json({
                    message: 'Admin created successfully'
                });
            })
        })
}


exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            if(error) return res.status(400).json({error})
            if(user) {
                if(user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
                    const {_id, firstName, lastName, email, role, fullName} = user;
                    return res.status(200).json({
                        token: token,
                        user: {_id, firstName, lastName, email, role, fullName}
                    })
                } else {
                    return res.status(400).json({message: 'Invalid credentials'})
                }
            } else {
                return res.status(400).json({message: 'Invalid credentials'})
            }
        })
}

exports.requireSignin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(400).json({'message': 'Unauthenticated'})
    }
}
