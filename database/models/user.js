const mongoose = require('mongoose');
const joi = require('joi');

// Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    }
});

// Model
const User = mongoose.model('users', userSchema);

// Data Validation
const validate1 = (data) => {
    const schema = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required()
    });
    return schema.validate(data);
}

const validate2 = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return schema.validate(data);
}

module.exports = { User, validate1, validate2 };
