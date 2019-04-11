const Joi = require('joi');

const LoginSchema = require('../dtos.schemas/LoginSchema');
const User = require('../auth.models/User');

const jwtService = require('../auth.services/jwtService');

const getUser = login => new User(login.userName);

exports.authenticate = async (req) => {
  const login = req.body;
  const valid = await Joi.validate(login, LoginSchema.schema);
  return valid ? jwtService.generateToken(getUser(login)) : null;
};
