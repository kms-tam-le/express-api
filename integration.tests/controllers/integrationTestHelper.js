const NoAuthenticationError = require('../../errors/NoAuthenticationError');
const ErrorResponseEntity = require('../../dtos/ErrorResponseEntity');

const User = require('../../auth.models/User');
const jwtService = require('../../auth.services/jwtService');

exports.assertNoToken = (res) => {
  const errorResponseEntity = new ErrorResponseEntity(new NoAuthenticationError('No token to verify'));
  res.should.have.status(403);
  res.body.should.be.eql(errorResponseEntity);
};

exports.assertInvalidToken = (res) => {
  const errorResponseEntity = new ErrorResponseEntity(new NoAuthenticationError('jwt malformed'));
  res.should.have.status(403);
  res.body.should.be.eql(errorResponseEntity);
};

exports.execute = (request, assert, done) => {
  request.end((err, res) => {
    assert(res);
    done();
  });
};

exports.createJWTToken = (hasPermission) => {
  const user = new User('TEST USER');
  if (!hasPermission) {
    user.permissions = [];
  }
  return jwtService.generateToken(user);
};
