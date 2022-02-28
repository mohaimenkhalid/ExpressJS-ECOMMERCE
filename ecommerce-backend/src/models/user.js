const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    hashPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true});

userSchema.virtual('password')
    .set(function (password){
        console.log(password, 'adad')
        this.hashPassword = bcrypt.hashSync(password, 10);
    });

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hashPassword)
    }
}

module.exports = mongoose.model('User', userSchema);