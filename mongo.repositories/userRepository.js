
const baseRepository = require('./baseRepository');

const collectionName = 'user';

exports.createOne = async (user, context) => {
  const { mongoClient } = context;
  const mongoCollection = mongoClient.collection(collectionName);
  return baseRepository.createOne(mongoCollection, user);
};

exports.findAll = async (context) => {
  const { mongoClient } = context;
  const mongoCollection = mongoClient.collection(collectionName);
  return baseRepository.findAll(mongoCollection);
};
