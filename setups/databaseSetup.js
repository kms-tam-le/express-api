const mongodb = require('mongodb');

const mongoURL = 'mongodb://localhost:27017';
const mongoDB = 'express';

exports.mongoDBSetup = (app) => {
  const mongoClient = mongodb.MongoClient;
  mongoClient.connect(mongoURL, {
    poolSize: 10,
    useNewUrlParser: true
  })
    .then((client) => {
      console.log('SUCCESS to connect to Mongo server::', mongoURL);
      const { locals } = app;
      locals.mongoClient = client.db(mongoDB);
      console.log('SUCCESS to connect to Mongo DB::', mongoDB);
    })
    .catch((err) => {
      console.log('ERROR connecting Mongo server::', err);
      process.exit(1);
    });
};
