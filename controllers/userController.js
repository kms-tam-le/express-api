const { HTTPCode } = require('../consts/HTTPCode');
const utils = require('../utils/webUtils');
const userService = require('../services/userService');

exports.getAll = (req) => {
  utils.processRequest(req, userService.findAll, req.context, HTTPCode.OK);
};

exports.getById = (req) => {
  const { id } = req.params;
  utils.processRequest(req, userService.findById, id, HTTPCode.OK);
};

exports.createOne = (req) => {
  const { context } = req;
  context.data = req.body;
  utils.processRequest(req, userService.createOne, context, HTTPCode.CREATED);
};

exports.updateOne = (req) => {
  utils.processRequest(req, console.log, 'TBD', HTTPCode.OK);
};
