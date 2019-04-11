
const MongoPersistentError = require('../errors/MongoPersistentError');

const collectionName = 'user';

exports.createOne = async (user, context) => {
  const { mongoClient } = context;
  const mongoCollection = mongoClient.collection(collectionName);
  return new Promise((resolve, reject) => {
    mongoCollection.insertOne(user, ((err, result) => {
      if (err !== null) reject(new MongoPersistentError(err.message));
      else resolve({ insertId: result.insertedId });
    }));
  });
};

exports.findAll = async (context) => {
  const { mongoClient } = context;
  const mongoCollection = mongoClient.collection(collectionName);
  return new Promise((resolve, reject) => {
    mongoCollection.find().toArray(((err, result) => {
      if (err !== null) reject(new MongoPersistentError(err.message));
      else {
        resolve(result);
      }
    }));
  });
};
