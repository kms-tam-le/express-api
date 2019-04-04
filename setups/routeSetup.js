const Joi = require('joi');
const SchemaValidationError =require('../errors/SchemaValidationError');
const NoAuthenticationError =require('../errors/NoAuthenticationError');
const webUtils = require('../utils/webUtils');
const { HTTPCode } = require('../consts/HTTPCode');

const addHandlers = (req, res, next, endpoint) => {
    const isAuthenticate = endpoint.isAuthenticate || true;
    if (isAuthenticate) {
        const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
        authenticationMiddleware.authenticate(req, res, next);
    }
    endpoint.controller(req, res, next);
};


exports.setup = (app) => {
    console.log('##########API Endpoints setup start:::::::::::');
    const config = require('../configs/routeConfig');

    config.AUTHENTICATION_ENPOINTS.forEach((endpoint) => {
        console.log('Register AUTHENTICATION -', endpoint.url);
        app.post(endpoint.url, (req, res, next) => {
            endpoint.authenticate(req, res, next)
            .then((result) => {
                res.status(HTTPCode.OK).send(result);
            })
            .catch((err) => {
                console.log(err);
                next(new NoAuthenticationError('Failed to authentication'));
            });
        });
    });

    config.GET_ENDPOINTS.forEach((endpoint) => {
        console.log('Register GET-', endpoint.url);
        //app.get(endpoint.url, endpoint.controller);
        app.get(endpoint.url, (req, res, next) => {
            addHandlers(req, res, next, endpoint);
        });
    });
    config.POST_ENDPOINTS.forEach((endpoint) => {
        console.log('Register POST-', endpoint.url);
        const { validationSchema } = endpoint;
        if (validationSchema) {
            app.post(endpoint.url, (req, res, next) => {
                Joi.validate(req.body, validationSchema)
                .then((result) => {
                    endpoint.controller(req, res, next);
                })
                .catch((err) => {
                    next(new SchemaValidationError(JSON.stringify(err.details)));
                });
            });
        }else {
            app.post(endpoint.url, endpoint.controller);
        }
    });
    console.log('##########API Endpoints setup complete:::::::::::');
};
