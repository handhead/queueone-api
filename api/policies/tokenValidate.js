/**
 * tokenValidate
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  if (req.headers && req.headers.authorization) {
    JWTService.verify(req.headers.authorization, function (err, decoded) {
      if (err) return res.json(401, {
        message: 'The authorization has been refused for invalid credentials.'
      });
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.json(403, {
      message: 'The request requires user authentication.'
    });
  }
};
