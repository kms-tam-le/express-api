const repository = require('../mongo.repositories/userRepository');
const resolver = require('../mapper/resolver');

exports.findAll = async (context) => {
  const result = await repository.findAll(context);
  return resolver.toDtos(result);
};

exports.findById = async (id) => {
  console.log('Get User By Id::', id);
  return {
    userName: id,
    email: 'noemail@abc.com'
  };
};

exports.save = async (context) => {
  const { data } = context;
  const result = await repository.save(resolver.toEntity(data), context);
  return result;
};
