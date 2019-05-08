
const baseRepository = require('./baseRepository');

const collectionName = 'user';

exports.save = async (user, context) => {
  console.log('context = ', context);
  const { mongoClient } = context;
  const mongoCollection = mongoClient.collection(collectionName);
  return baseRepository.save(mongoCollection, user);
};

exports.findAll = async (context) => {
  const { mongoClient } = context;
  const mongoCollection = mongoClient.collection(collectionName);
  return baseRepository.findAll(mongoCollection);
};
