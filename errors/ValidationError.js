const BaseError = require('./BaseError');
const { HTTPCode } = require('../consts/HTTPCode');

class ValidationError extends BaseError {
  constructor(message) {
    super(message, HTTPCode.INVALID, 'INVALID');
    this.name = 'ValidationError';
  }
}
module.exports = ValidationError;
