/**
 * ConsumerController
 *
 * @description :: Server-side logic for managing consumers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res, next) {
    var params = req.body;

    User.create(params).exec(function userCreated(err, user) {
      if(err) return res.json(err.status, err);

      JWTService.issue(user, function tokenCreated(token) {
        return res.json(200, {
          token: token
        });
      });
    });
  }
};

