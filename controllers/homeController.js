const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');

const welcome = () => 'Welcome To Home Page';

exports.home = (req) => {
  main.process(req, welcome, null, HTTPCode.OK);
};
