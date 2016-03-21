/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /** GET /service/:providerId */
  providerServices: function(req, res, next){
    var providerId = req.param('providerId');
    Service.find({owner: providerId})
      .exec(function servicesFounded(err, services){
        if (err) return res.json(err.status, err);
        return res.json(200, services)
      })
  }

};

