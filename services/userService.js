const repository = require('../mongo.repositories/userRepository');
const UserDocument = require('../mongo.models/UserDocument');

exports.findAll = async (context) => {
  const result = await repository.findAll(context);
  return result;
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
