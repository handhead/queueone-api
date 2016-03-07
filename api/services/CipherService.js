var bcrypt = require('bcrypt');

module.exports = {

  hashPassword: function (password) {
    return bcrypt.hashSync(password, 10);
    /*bcrypt.hash(password, 10, function (err, hashed_password) {
     return hashed_password;
     });*/
  },

  comparePassword: function(password, user){
    return bcrypt.compareSync(password, user.password);
    /*bcrypt.compare(password, user.password, function (err, match) {
     return match;
     });*/
  }

};
