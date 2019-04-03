
const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');

const ValidationError =require('../errors/ValidationError');

exports.throwError = (req, res, next) => {
    const errorService = require('../services/errorService');
    main.process(req, errorService.error, 'Useless info', HTTPCode.OK);
  };

exports.error = (req, res, next) => {
    next(new ValidationError('pass error'));
  };