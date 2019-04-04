const jwt = require('jsonwebtoken');

const appConfig = require('../configs/appConfig');
const { APP_CONFIG } = appConfig;
const NoAuthenticationError = require('../errors/NoAuthenticationError');

const getToken = (req) => {
  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  return token;
}

exports.authenticate = (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    next(new NoAuthenticationError('No token to verify'));
  } else {
  jwt.verify(token, APP_CONFIG.jwtSecrectKey, (err, decoded) => {
    if (err) {
      next(new NoAuthenticationError('Invalid token'));
    } else {
      //TODO: Check expire and put User info to context
    }
  });
  };
}