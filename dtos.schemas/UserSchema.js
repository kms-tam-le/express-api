const Joi = require('joi');

exports.schema = Joi.object().keys({
  id: Joi.string().optional(),
  userName: Joi.string().required(),
  email: Joi.string().email()
});
