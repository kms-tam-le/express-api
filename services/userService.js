const repository = require('../mongo.repositories/userRepository');
const resolver = require('../mappers/resolver');
const bcryptUtil = require('../utils/bcryptUtil');

const defaultPassword = 'password';

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
  const entity = resolver.toEntity(data);

  // Set default password for case create new user
  if (!entity.password) {
    const hash = await bcryptUtil.hash(defaultPassword);
    entity.password = hash;
  }
  const result = await repository.save(entity, context);
  return result;
};
