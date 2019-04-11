
const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');

const ValidationError = require('../errors/ValidationError');

const errorService = require('../services/errorService');

exports.throwError = (req) => {
  main.process(req, errorService.error, 'Useless info', HTTPCode.OK);
};

exports.error = (req, res, next) => {
  next(new ValidationError('pass error'));
};
