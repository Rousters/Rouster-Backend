'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  basic: {
    id: String
  },
  pointCount: {type: Number, default: 0}
});

userSchema.methods.hashID = function(identification) {
  return bcrypt.hashSync(identification, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validID = function(identification) {
  return bcrypt.compareSync(identification, this.basic.id);
}

module.exports = mongoose.model('User', userSchema);
