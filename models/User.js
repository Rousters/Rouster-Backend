'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  basic: {
    email: String,
    password: String
  }
  username: String
  app: {
    alarmTime: String,
    wakeTime: [],
    totalPoints: Number,
    dailyPoints: Number,
    percentile: Number,
    rank: Number
  }
});

userSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(appSecret, callback) {
  eat.encode({id: this._id, timestamp: new Date()}, appSecret, callback)
};

module.exports = mongoose.model('User', userSchema);
