/**
 * ProviderController
 *
 * @description :: Server-side logic for managing providers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res, next) {
    var params = req.body;
    User.create({
      email: params.login,
      password: params.password
    }).exec(function userCreated(err, user) {
      if(err) res.json(err.status, err.summary);
      return res.json(200,user);
    });
  }
};
