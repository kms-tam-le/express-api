/* Import controllers */
const errorController = require('../controllers/errorController');

const END_POINTS = {
  error: '/error/',
  throwError: '/error/throw/',
};

exports.getEndpoints = () => [
  {
    url: END_POINTS.error,
    controller: errorController.error,
    authenticate: false
  },
  {
    url: END_POINTS.throwError,
    controller: errorController.throwError,
    authenticate: false
  }
];
