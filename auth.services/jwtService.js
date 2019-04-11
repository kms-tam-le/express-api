const jwt = require('jsonwebtoken');
const appConfig = require('../configs/appConfig');

exports.generateToken = (user) => {
  const { APP_CONFIG } = appConfig;
  const token = jwt.sign({ user },
    APP_CONFIG.jwtSecrectKey,
    {
      expiresIn: APP_CONFIG.jwtTokenExpired,
    });
  return token;
};
