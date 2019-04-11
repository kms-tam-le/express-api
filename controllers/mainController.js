const webUtils = require('../utils/webUtils');

exports.process = (req, serviceMethod, serviceArgument, httpCode) => {
  const asyncFn = async arg => serviceMethod(arg);
  const { context } = req;
  asyncFn(serviceArgument)
    .then((result) => {
      console.log('MAIN CONTROLLER::result receive = ', result);
      const { res } = context;
      const responseData = result || {};
      webUtils.responseSuccess(res, httpCode, responseData);
    })
    .catch((err) => {
      context.next(err);
    });
};
