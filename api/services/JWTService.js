/**
 * JWTService
 *
 * @module      :: Services
 * @description :: Simple policy to allow any authenticated user
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Services
 *
 */
var jwt = require('jsonwebtoken');
var secret ='592a88c3d69e5882bd92efce1b7227dbb44e21cf5b5b64fe9e39254e1d75a454';

module.exports = {

  issue: function (payload, callback) {
    jwt.sign(
      payload,
      secret,
      { algorithm: 'HS256' }, // sign with HMAC SHA256
      callback
    );
  },

  verify: function (token, callback) {
    jwt.verify(
      token, // The token to be verified
      secret, // Same token we used to sign
      { algorithm: 'HS256' }, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      callback // Pass errors or decoded token to callback, eg. function (err, decoded) {}
    );
  }

};
