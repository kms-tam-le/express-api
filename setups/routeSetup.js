const Joi = require('joi');

const SchemaValidationError = require('../errors/SchemaValidationError');
const NoAuthenticationError = require('../errors/NoAuthenticationError');
const NoAuthorizationError = require('../errors/NoAuthorizationError');
const { HTTPCode } = require('../consts/HTTPCode');
const authenticationService = require('../auth.services/authenticationService');
const authorizationService = require('../auth.services/authorizationService');
const config = require('../configs/routeConfig');

const addController = (req, res, next, endpoint) => {
  try {
    const authenticate = (endpoint.authenticate === undefined) ? true : endpoint.authenticate;
    if (authenticate) {
      authenticationService.authenticate(req);
      const { permissions } = endpoint;
      const { user } = req.context;
      if (permissions) {
        const isAuthorize = authorizationService.authorize(user, permissions);
        if (!isAuthorize) {
          throw new NoAuthorizationError('No permission to access');
        }
      }
    }
    endpoint.controller(req, res, next);
  } catch (error) {
    next(error);
  }
};


exports.setup = (app) => {
  console.log('##########API Endpoints setup start:::::::::::');

  config.authEndpoints().forEach((endpoint) => {
    console.log('Register AUTHENTICATION -', endpoint.url);
    app.post(endpoint.url, (req, res, next) => {
      endpoint.authenticate(req, res, next)
        .then((result) => {
          res.status(HTTPCode.OK).send(result);
        })
        .catch(() => {
          next(new NoAuthenticationError('Failed to authentication'));
        });
    });
  });

  config.getEndpoints().forEach((endpoint) => {
    console.log('Register GET-', endpoint.url);
    app.get(endpoint.url, (req, res, next) => {
      addController(req, res, next, endpoint);
    });
  });
  config.postEndpoints().forEach((endpoint) => {
    console.log('Register POST-', endpoint.url);
    const { validationSchema } = endpoint;
    if (validationSchema) {
      app.post(endpoint.url, (req, res, next) => {
        Joi.validate(req.body, validationSchema)
          .then(() => {
            addController(req, res, next, endpoint);
          })
          .catch((err) => {
            next(new SchemaValidationError(JSON.stringify(err.details)));
          });
      });
    } else {
      app.post(endpoint.url, (req, res, next) => {
        addController(req, res, next, endpoint);
      });
    }
  });
  console.log('##########API Endpoints setup complete:::::::::::');
};
