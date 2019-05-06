
const { HTTPCode } = require('../consts/HTTPCode');
const utils = require('../utils/webUtils');

const ValidationError = require('../errors/ValidationError');

const errorService = require('../services/errorService');

exports.throwError = (req) => {
  utils.processRequest(req, errorService.error, 'Useless info', HTTPCode.OK);
};

exports.error = (req, res, next) => {
  next(new ValidationError('pass error'));
};
