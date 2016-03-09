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
      return res.json(400, {
        message: 'Credenciais inválidas.'
      });
    } else {
      Consumer.findOne({ cpf: params.cpf })
        .exec(function consumerFouded(err, consumer) {
          if (err) return res.json(err.status, err);
          if (consumer && CipherService.comparePassword(params.password, consumer)) {
            delete user.password;
            JWTService.issue(user, function tokenCreated(token) {
              return res.json(200, {token: token, type: "Bearer", expires_in: "never"});
            });
          } else {
            return res.json(400, {
              message: 'Credenciais inválidas, tente novamente.'
            });
          }
        });
    }
  },

  /** GET /consumer */
  details: function(req, res, next){
    Consumer.findOne({cpf: req.decoded.cpf})
      .exec(function consumerFounded(err, consumer){
        if (err) return res.json(err.status, err);
        return res.json(200,{
          firstName: consumer.firstName,
          lastName: consumer.lastName,
          cpf: consumer.lastName,
          email: consumer.email
        })
      })
  }
};

