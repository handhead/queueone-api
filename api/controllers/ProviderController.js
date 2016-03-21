/**
 * ProviderController
 *
 * @description :: Server-side logic for managing providers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /** POST /provider */
  create: function(req, res, next) {
    var params = req.body;

    Provider.create(params).exec(function userCreated(err, provider) {
      if(err) return res.json(err.status, err);

      JWTService.issue(provider, function tokenCreated(token) {
        return res.json(200, {
          token: token
        });
      });
    });
  },

  /** POST /provider/signin */
  signin: function (req, res, next) {
    var params = req.body;
    if (!params.cnpj||!params.password){
      return res.json(400, {
        message: 'Credenciais inválidas.'
      });
    } else {
      Provider.findOne({ cnpj: params.cnpj })
        .exec(function consumerFouded(err, provider) {
          if (err) return res.json(err.status, err);
          if (consumer && CipherService.comparePassword(params.password, provider)) {
            delete provider.password;
            JWTService.issue(provider, function tokenCreated(token) {
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

  /** GET /provider */
  details: function(req, res, next){
    Provider.findOne({cnpj: req.decoded.cnpj})
      .exec(function consumerFounded(err, provider){
        if (err) return res.json(err.status, err);
        delete provider.password;
        return res.json(200, provider)
      })
  }
};

