'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  id: String;
  pointCount: {type: Number, default: 0}
});

userSchema.methods.hashID = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

module.exports = mongoose.model('User', userSchema);
