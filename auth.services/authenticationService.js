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

exports.authenticate = (req) => {
  const token = getToken(req);
  if (!token) {
    throw new NoAuthenticationError('No token to verify');
  } else {
    jwt.verify(token, APP_CONFIG.jwtSecrectKey, (err, decoded) => {
    if (err) {
      throw new NoAuthenticationError(err.message);
    } else {
      console.log(decoded);
      const { user } = decoded
      req.context.user = user;
    }
  });
  };
}