const Joi = require('joi');

const LoginSchema = require('../dtos.schemas/LoginSchema');
const User = require('../auth.models/User');

const jwtGenerator = require('./jwtGenerator');

exports.authenticate = async (req, res, next) => {
    const login = req.body;
    const valid = await Joi.validate(login, LoginSchema.schema)
    return valid ? jwtGenerator.generateToken(getUser(login)) : null;
}

const getUser = (login) => {
    return new User(login.userName);
}