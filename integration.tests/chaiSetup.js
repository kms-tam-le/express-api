
/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

exports.initialTestServer = () => {
  chai.should();
  chai.use(chaiHttp);
  return chai.request(app);
};
