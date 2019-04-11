const Joi = require('joi');

exports.schema = Joi.object().keys({
  userName: Joi.string().required(),
  email: Joi.string().email()
});
