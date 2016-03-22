/**
 * ProviderController
 *
 * @description :: Server-side logic for managing providers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /** POST /provider */
  create: function (req, res, next) {
    var params = req.body;

    ObeliskService.findCNPJ(params.cnpj, function(err, resp){
      if(err) return res.json(403, {
        message: 'ERROR OBELISK'
      });

      Provider.create(params).exec(function userCreated(err, provider) {
        if (err) return res.json(err.status, err);

        JWTService.issue(provider, function tokenCreated(token) {
          return res.json(200, {
            token: token
          });
        });

      return res.json(200,JSON.parse(resp.body));
      });
    });
  },

  /** POST /provider/signin */
  signin: function (req, res, next) {
    var params = req.body;
    if (!params.cnpj || !params.password) {
      return res.json(400, {
        message: "Credenciais inválidas."
      });
    }
    Provider.findOne({cnpj: params.cnpj})
      .exec(function consumerFounded(err, provider) {
        if (err) return res.json(err.status, err);
        if (provider && provider.verifyPassword(params.password)) {
          JWTService.issue(provider, function tokenCreated(token) {
            return res.json(200, {token: token, type: "Bearer", expires_in: "never"});
          });
        } else {
          return res.json(400, {
            message: 'Credenciais inválidas, tente novamente.'
          });
        }
      });
  },

  /** GET /provider */
  details: function (req, res, next) {
    Provider.findOne({cnpj: req.decoded.cnpj})
      .exec(function consumerFounded(err, provider) {
        if (err) return res.json(err.status, err);
        delete provider.password;
        return res.json(200, provider)
      })
  },

  /** GET /providers */
  all: function (req, res, next) {
    Provider.find()
      .exec(function providersFounded(err, providers) {
        if (err) return res.json(err.status, err);
        return res.json(200, {
          providers: providers
        });
      });
  },

  /** GET /service/:providerId */
  services: function (req, res, next) {
    var providerId = req.param('providerId');
    Service.find({owner: providerId})
      .exec(function servicesFounded(err, services) {
        if (err) return res.json(err.status, err);
        return res.json(200, services)
      })
  }


};

