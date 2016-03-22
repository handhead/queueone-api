/**
 * ObeliskService
 *
 * @module      :: Services
 * @description :: //TODO
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Services
 *
 */
var request = require('request');

var obelisk = {
  hostname: 'http://obelisk.gq/',
  version: 'v1/',
  url: function(){
    return this.hostname + this.version;
  }
};

module.exports = {

  findCNPJ: function(cnpj, callback){
    request.get(obelisk.url() + 'cnpj/' + cnpj, function(err, httpResponse){
      if(err) return callback(err, null);
      return callback(null, httpResponse)
    })

  }

};
