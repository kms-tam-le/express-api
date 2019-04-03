const Joi = require('joi');

const LoginSchema = require('../dtos.schemas/LoginSchema');
const User = require('../auth.models/User');

exports.authenticate = async (req, res, next) => {
    const login = req.body;
    const valid = await Joi.validate(login, LoginSchema.schema)
    return getUser(login);
}

const getUser = (login) => {
    return new User(login.username);
}