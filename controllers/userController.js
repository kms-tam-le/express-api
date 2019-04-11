const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');
const userService = require('../services/userService');

exports.getAll = (req) => {
  main.process(req, userService.findAll, req.context, HTTPCode.OK);
};

exports.getById = (req) => {
  const { id } = req.params;
  main.process(req, userService.findById, id, HTTPCode.OK);
};

exports.createOne = (req) => {
  const { context } = req;
  context.data = req.body;
  main.process(req, userService.createOne, context, HTTPCode.CREATED);
};
