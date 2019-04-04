const appConfig = require('../configs/appConfig');

exports.generateToken = (user) => {
    const jwt = require('jsonwebtoken');
    const { APP_CONFIG } = appConfig;
    const token = jwt.sign({ user },
        APP_CONFIG.jwtSecrectKey,
        { 
            expiresIn: APP_CONFIG.jwtTokenExpired
        }
    );
    jwt.verify(token, APP_CONFIG.jwtSecrectKey, (err, decoded) => {
        if (err) {
         console.log(err);
        } else {
         console.log(decoded);
        }
      });
    return token;
};

exports.getUser = (token) => {
    jwt.verify(token, jwtConfig.secret);
}