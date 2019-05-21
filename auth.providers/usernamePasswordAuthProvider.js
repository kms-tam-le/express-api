const Joi = require('joi');

const LoginSchema = require('../dtos.schemas/LoginSchema');
const userRepository = require('../mongo.repositories/userRepository');

const jwtService = require('../auth.services/jwtService');
const resolver = require('../mappers/resolver');
const bcryptUtil = require('../utils/bcryptUtil');

exports.authenticate = async (req) => {
  const { context, body: login } = req;
  const validated = await Joi.validate(login, LoginSchema.schema);
  // Check username
  const userEntity = await userRepository.findOne({ userName: validated.userName }, context);
  if (!userEntity) {
    throw new Error('Cannot find user');
  }

  // Verify password
  const match = await bcryptUtil.compare(validated.password, userEntity.password);
  if (!match) {
    throw new Error('Password mismatch');
  }

  const userContext = resolver.toDto(userEntity);
  userContext.permissions = ['Admin', 'Manager'];
  console.log('Complete authenitcate::');
  return jwtService.generateToken(userContext);
};

exports.generateToken = async (req) => {
  const validated = await Joi.validate(req.body, LoginSchema.schema);
  validated.permissions = ['Admin', 'Manager'];
  return jwtService.generateToken(validated);
};
