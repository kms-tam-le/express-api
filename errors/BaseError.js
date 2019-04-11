class BaseError extends Error {
  constructor(message, status, errorCode) {
    super(message);
    this.httpStatus = status;
    this.errorCode = errorCode;
  }
}
module.exports = BaseError;
