const webUtils = require('../utils/webUtils');
const bodyParser = require('body-parser');

const addMiddleware = ((app, middleware) => {
    const { args } = middleware;
    if (args) {
        if (args === 'DEFAULT') {
            app.use((req, res, next) => {
                middleware.method(req, res, next);
            });
        } else {
            app.use(middleware.method(args));
        }
    } else {
        app.use(middleware.method());
    }
});

exports.setup = (app) => {
    console.log('########## Middlewares setup:::::::::::');
    //Configure application middlewares
    const config = require('../configs/middlewareConfig');
    config.APP_MIDDLEWARES.forEach((middleware) => {
        addMiddleware(app, middleware);
    });
};

  exports.handlerError = (app) => {
    console.log('########## GLOBAL Error Handler setup:::::::::::');
    app.use((err, req, res, next) => {
        webUtils.responseError(res, err, next);
      });
  };