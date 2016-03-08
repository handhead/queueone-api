/**
 * ProviderController
 *
 * @description :: Server-side logic for managing providers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res, next) {
    var params = req.body;

    Provider.create(params).exec(function userCreated(err, user) {
      if(err) return res.json(err.status, err);

      JWTService.issue(user, function tokenCreated(token) {
        return res.json(200, {
          token: token
        });
      });
    });
  }
};

