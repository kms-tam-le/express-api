const ValidationError = require('../errors/ValidationError');

exports.error = async () => {
  throw new ValidationError('throw error');
};
