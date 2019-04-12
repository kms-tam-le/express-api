/* Import controllers */
const homeController = require('../controllers/homeController');

/* Import route config */
const userRouteConfig = require('../configs.routes/userRouteConfig');
const errorRouteConfig = require('../configs.routes/errorRouteConfig');
const authRouteConfig = require('../configs.routes/authRouteConfig');

const routeConfigs = [
  userRouteConfig,
  errorRouteConfig
];

exports.authEndpoints = () => authRouteConfig.endpoints();

exports.getEndpoints = () => {
  let endpoints = [
    {
      url: '/',
      controller: homeController.home,
      authenticate: false
    }
  ];
  routeConfigs
    .filter(config => typeof config.getEndpoints === 'function')
    .forEach((config) => {
      endpoints = endpoints.concat(config.getEndpoints());
    });
  return endpoints;
};

exports.postEndpoints = () => {
  let endpoints = [];
  routeConfigs
    .filter(config => typeof config.postEndpoints === 'function')
    .forEach((config) => {
      endpoints = endpoints.concat(config.postEndpoints());
    });
  return endpoints;
};
