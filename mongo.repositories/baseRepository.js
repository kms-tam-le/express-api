const { ObjectID } = require('mongodb');

const MongoPersistentError = require('../errors/MongoPersistentError');
const commonUtils = require('../utils/commonUtils');

exports.save = async (collection, document) => new Promise((resolve, reject) => {
  const { _id: id } = document;
  // Has id => Update
  if (id) {
    console.log('Update###document = ', document);
    commonUtils.removeFields(document, ['_id']);
    collection.updateOne({ _id: ObjectID(id) }, { $set: document }, ((err, result) => {
      if (err !== null) {
        reject(new MongoPersistentError(err.message));
      } else {
        resolve(result);
      }
    }));
  } else {
    console.log('Insert###id = ', id);
    collection.insertOne(document, ((err, result) => {
      if (err !== null) {
        reject(new MongoPersistentError(err.message));
      } else {
        resolve({ insertId: result.insertedId });
      }
    }));
  }
});

exports.findAll = async collection => new Promise((resolve, reject) => {
  collection.find().toArray(((err, result) => {
    if (err !== null) {
      reject(new MongoPersistentError(err.message));
    } else {
      resolve(result);
    }
  }));
});
