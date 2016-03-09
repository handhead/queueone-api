/**
 * Consumer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var CPF = require("cpf_cnpj").CPF;

module.exports = {

  types: {
    isCPF: function(cpf) {
      return CPF.isValid(cpf);
    }
  },

  attributes: {
    firstName:{
      type: 'string',
      required: true
    },
    lastName:{
      type: 'string',
      required: true
    },
    cpf: {
      type: 'string',
      required:true,
      unique:true,
      isCPF: true
    },
    password:{
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    }
  },

  beforeCreate: function (user, next) {
    user.password = CipherService.hashPassword(user.password);
    next();
  }
};
