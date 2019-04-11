class ErrorResponseEntity {
  constructor(error) {
    this.status = error.httpStatus;
    this.code = error.errorCode;
    this.errorName = error.name;
    this.details = error.message;
  }
}
module.exports = ErrorResponseEntity;
