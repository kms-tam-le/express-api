const repository = require('../mongo.repositories/userRepository');
const resolver = require('../mappers/resolver');

exports.findAll = async (context) => {
  const result = await repository.findAll(context);
  return resolver.toDtos(result);
};

exports.findById = async (context) => {
  const { id } = context;
  const result = await repository.findOne({ id }, context);
  return resolver.toDto(result);
};

exports.save = async (context) => {
  const { data } = context;
  const result = await repository.save(resolver.toEntity(data), context);
  return result;
};
