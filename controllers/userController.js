const { HTTPCode } = require('../consts/HTTPCode');
const utils = require('../utils/webUtils');
const userService = require('../services/userService');

exports.getAll = (req) => {
  utils.processRequest(req, userService.findAll, req.context, HTTPCode.OK);
};

exports.getById = (req) => {
  const { context, params } = req;
  const { id } = params;
  context.id = id;
  utils.processRequest(req, userService.findById, context, HTTPCode.OK);
};

exports.save = (req) => {
  const { context, body } = req;
  context.data = body;
  const httpCode = body.id ? HTTPCode.OK : HTTPCode.CREATED;
  utils.processRequest(req, userService.save, context, httpCode);
};
