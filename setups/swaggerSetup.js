exports.setup = (app) => {
    const expressSwagger = require('express-swagger-generator')(app);
    const config = require('../configs/swaggerConfig');
    expressSwagger(config.SWAGGER_CONFIG);
}