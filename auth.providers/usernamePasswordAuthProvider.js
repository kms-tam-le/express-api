const Joi = require('joi');

const LoginSchema = require('../dtos.schemas/LoginSchema');
const userRepository = require('../mongo.repositories/userRepository');

const jwtService = require('../auth.services/jwtService');
const resolver = require('../mappers/resolver');

exports.authenticate = async (req) => {
  const { context, body: login } = req;
  const validated = await Joi.validate(login, LoginSchema.schema);
  const userEntity = await userRepository.findOne({ userName: validated.userName }, context);
  if (!userEntity) {
    return null;
  }
  const userContext = resolver.toDto(userEntity);
  // TODO: Verify password with encrypt
  userContext.permission = ['Admin', 'Manager'];

  return jwtService.generateToken(userContext);
};
