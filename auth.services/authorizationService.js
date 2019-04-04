const jwt = require('jsonwebtoken');

const appConfig = require('../configs/appConfig');
const { APP_CONFIG } = appConfig;
const NoAuthenticationError = require('../errors/NoAuthenticationError');

exports.authorize = (user, permissions) => {
  return user.permissions.some(element => {
    return permissions.includes(element);
  });
}