const { HTTPCode } = require('../consts/HTTPCode');
const utils = require('../utils/webUtils');

const welcome = () => 'Welcome To Home Page';

exports.home = (req) => {
  utils.processRequest(req, welcome, null, HTTPCode.OK);
};
