/* Import aunthentication provider */
const usernamePasswordAuthProvider = require('../auth.providers/usernamePasswordAuthProvider');

exports.authEndpoints = () => [
  {
    url: '/authentication',
    authenticate: usernamePasswordAuthProvider.authenticate
  },
  {
    url: '/generate-token',
    authenticate: usernamePasswordAuthProvider.generateToken
  },
];
