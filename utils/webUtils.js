const ResponseEntity = require('../dtos/ResponseEntity');
const ErrorResponseEntity = require('../dtos/ErrorResponseEntity');

const responseSuccess = (res, httpCode, data) => {
  res.status(httpCode).send(new ResponseEntity(httpCode, data));
};

exports.responseSuccess = responseSuccess;

exports.responseError = (res, error, next) => {
  if (error.httpStatus) {
    res.status(error.httpStatus).send(new ErrorResponseEntity(error));
  } else {
    next(error);
  }
};

exports.processRequest = (req, serviceMethod, serviceArgument, httpCode) => {
  const asyncFn = async arg => serviceMethod(arg);
  const { context } = req;
  asyncFn(serviceArgument)
    .then((result) => {
      const { res } = context;
      const responseData = result || {};
      responseSuccess(res, httpCode, responseData);
    })
    .catch((err) => {
      context.next(err);
    });
};
