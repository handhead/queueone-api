/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    password:{
      type: 'string',
      required: true
    },
    consumer: {
      model: 'consumer',
      unique: true
    },
    provider: {
      model: 'provider',
      unique: true
    },
    administrator: {
      model: 'administrator',
      unique: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    }
  },

  beforeCreate: function (user, next) {
    user.password = CipherService.hashPassword(user.password);
    next();
  },

  afterCreate: function(user, next) {
    if(user.consumer){
      return Consumer.update({id:user.consumer}, {user: user.id}).exec(next);
    }else if(user.provider){

    }else if(user.administrator){

    }
    next();
  }
};

