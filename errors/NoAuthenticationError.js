const BaseError = require('./BaseError');
const { HTTPCode } = require('../consts/HTTPCode');

class NoAuthenticationError extends BaseError {
    constructor(message) {
      super(message, HTTPCode.FORBIDDEN, 'NO-AUTHENTICATION');
      this.name = "NoAuthenticationError";
    }
  }
module.exports = NoAuthenticationError;
  