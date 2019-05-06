/* Import controllers */
const homeController = require('../controllers/homeController');

const commonUtils = require('../utils/commonUtils');

const routeConfigDir = `${__dirname}/../configs.routes/`;

const routeConfigs = commonUtils.loadObjectsFromFolder(routeConfigDir);

exports.authEndpoints = () => {
  let endpoints = [];
  routeConfigs
    .filter(config => typeof config.authEndpoints === 'function')
    .forEach((config) => {
      endpoints = endpoints.concat(config.authEndpoints());
    });
  return endpoints;
};

exports.getEndpoints = () => {
  // Append special endpoint here
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
