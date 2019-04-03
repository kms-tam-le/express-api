const webUtils = require('../utils/webUtils');

exports.error = (err, req, res, next) => {
    webUtils.responseError(res, err, next);
   };