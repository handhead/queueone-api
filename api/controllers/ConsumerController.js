/**
 * ConsumerController
 *
 * @description :: Server-side logic for managing consumers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /** POST /consumer */
  create: function(req, res, next) {
    var params = req.body;

    Consumer.create(params).exec(function consumerCreated(err, user) {
      if(err) return res.json(err.status, err);

      JWTService.issue(user, function tokenCreated(token) {
        return res.json(200, {
          token: token
        });
      });
    });
  },

  /** POST /consumer/signin */
  signin: function (req, res, next) {
    var params = req.body;
    if (!params.cpf||!params.password){
      return res.json(403, {
        message: 'Credenciais Inválidas, tente novamente.'
      });
    } else {
      Consumer.findOne({ cpf: params.cpf })
        .exec(function consumerFouded(err, user) {
          if (err) return res.json(err.status, err);
          if (user && CipherService.comparePassword(params.password, user)) {
            delete user.password;
            JWTService.issue(user, function tokenCreated(token) {
              return res.json(200, {token: token});
            });
          } else {
            return res.json(403, {
              message: 'Credenciais Inválidas, tente novamente.'
            });
          }
        });
    }
  },
};

