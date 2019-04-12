const repository = require('../mongo.repositories/userRepository');
const UserDocument = require('../mongo.models/UserDocument');
const mapper = require('../services.mapping/serviceMapper');

exports.findAll = async (context) => {
  const result = await repository.findAll(context);
  return mapper.toDtos(result);
};

exports.findById = async (id) => {
  console.log('Get User By Id::', id);
  return {
    userName: id,
    email: 'noemail@abc.com'
  };
};

exports.createOne = async (context) => {
  const { data } = context;
  const result = await repository.createOne(new UserDocument(data), context);
  return result;
};
