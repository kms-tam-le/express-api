const BaseError = require('./BaseError');
const { HTTPCode } = require('../consts/HTTPCode');

class NoAuthorizationError extends BaseError {
  constructor(message) {
    super(message, HTTPCode.NOT_AUTHORIZED, 'NO-AUTHORIZED');
    this.name = 'NoAuthorizationError';
  }
}
module.exports = NoAuthorizationError;
