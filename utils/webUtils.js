const ResponseEntity =require('../dtos/ResponseEntity');
const ErrorResponseEntity =require('../dtos/ErrorResponseEntity');

exports.responseSuccess = (res, httpCode, data) => {
    res.status(httpCode).send(new ResponseEntity(httpCode, data));
};

exports.responseError = (res, error, next) => {  
    if (error.httpStatus) {
        res.status(error.httpStatus).send(new ErrorResponseEntity(error));
    }
    else {
        next(error);
    }
};