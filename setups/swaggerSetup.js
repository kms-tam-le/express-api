const expressSwagger = require('express-swagger-generator')(app);
const config = require('../configs/swaggerConfig');

exports.setup = () => {
  expressSwagger(config.SWAGGER_CONFIG);
};
