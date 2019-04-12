
const MongoPersistentError = require('../errors/MongoPersistentError');

exports.createOne = async (mongoCollection, document) => new Promise((resolve, reject) => {
  mongoCollection.insertOne(document, ((err, result) => {
    if (err !== null) {
      reject(new MongoPersistentError(err.message));
    } else {
      resolve({ insertId: result.insertedId });
    }
  }));
});

exports.findAll = async mongoCollection => new Promise((resolve, reject) => {
  mongoCollection.find().toArray(((err, result) => {
    if (err !== null) {
      reject(new MongoPersistentError(err.message));
    } else {
      resolve(result);
    }
  }));
});
