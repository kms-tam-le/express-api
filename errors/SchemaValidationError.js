const BaseError = require('./BaseError');
const { HTTPCode } = require('../consts/HTTPCode');

class SchemaValidationError extends BaseError {
    constructor(message) {
      super(message, HTTPCode.INVALID, 'INVALID-SCHEMA');
      this.name = "SchemaValidation";
    }
  }
module.exports = SchemaValidationError;
  