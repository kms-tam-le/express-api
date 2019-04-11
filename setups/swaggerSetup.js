/* eslint-disable */
const config = require('../configs/swaggerConfig');

exports.setup = (app) => {
  const expressSwagger = require('express-swagger-generator')(app);
  expressSwagger(config.SWAGGER_CONFIG);
};
