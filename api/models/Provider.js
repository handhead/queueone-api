/**
 * Provider.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var CNPJ = require("cpf_cnpj").CNPJ;

module.exports = {

  types: {
    isCNPJ: function(cnpj) {
      return CNPJ.isValid(cnpj);
    }
  },

  attributes: {
    companyName: {
      type: 'string',
      required: true
    },
    fantasyName: {
      type: 'string',
      required: true
    },
    cnpj: {
      type: 'string',
      required:true,
      unique: true,
      isCNPJ: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required:true,
      unique: true
    }
  },

  beforeCreate: function (user, next) {
    user.password = CipherService.hashPassword(user.password);
    next();
  }
};
