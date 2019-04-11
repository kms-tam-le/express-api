const BaseError = require('./BaseError');
const { HTTPCode } = require('../consts/HTTPCode');

class MongoPersistentError extends BaseError {
  constructor(message) {
    super(message, HTTPCode.INVALID, 'PERISTENT-ERROR');
    this.name = 'MongoPersistentError';
  }
}
module.exports = MongoPersistentError;
