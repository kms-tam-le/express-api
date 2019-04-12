/* Import aunthentication provider */
const usernamePasswordAuthProvider = require('../auth.providers/usernamePasswordAuthProvider');

exports.endpoints = () => [
  {
    url: '/authentication',
    authenticate: usernamePasswordAuthProvider.authenticate
  }
];
