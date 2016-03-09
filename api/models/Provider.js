/**
 * Provider.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

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
      unique: true
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
