'use strict';

var mongoose = require('mongoose');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  id: String,
  pointCount: {type: Number, default: 0}
});

userSchema.methods.generateToken = function(appSecret, callback) {
  eat.encode({id: this.id}, appSecret, callback);
};

module.exports = mongoose.model('User', userSchema);
