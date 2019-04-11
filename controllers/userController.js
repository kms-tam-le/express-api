const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');
const userService = require('../services/userService');

exports.getUsers = (req) => {
  main.process(req, userService.getUsers, null, HTTPCode.OK);
};

exports.post = (req) => {
  const user = req.body;
  main.process(req, userService.post, user, HTTPCode.CREATED);
};
