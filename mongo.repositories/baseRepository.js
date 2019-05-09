const { ObjectID } = require('mongodb');

const MongoPersistentError = require('../errors/MongoPersistentError');
const commonUtils = require('../utils/commonUtils');

/* eslint-disable */
const convertToObjectID = (obj) => {
  if (obj.id) {
    const id = ObjectID(obj.id);
    delete obj.id;
    obj._id = id
  }
}

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

const findArray = async (collection, query) => new Promise((resolve, reject) => {
  convertToObjectID(query);
  collection.find(query).toArray(((err, result) => {
    if (err !== null) {
      reject(new MongoPersistentError(err.message));
    } else {
      resolve(result);
    }
  }));
});

exports.findArray = findArray;

exports.findOne = async (collection, query) => new Promise((resolve, reject) => {
  Promise.resolve( findArray(collection, query))
  .then(result => {
    if (result && result.length > 1) {
      reject(new MongoPersistentError('Expect 1 document while existing ', result.length));
    } else {
      resolve(result ? result[0] : null);
    }
  })
  .catch((err) => {
    reject(new MongoPersistentError(err.message));
  });
});


exports.getCollection = (context, collectionName) => {
  const { mongoClient } = context;
  return mongoClient.collection(collectionName);
};
