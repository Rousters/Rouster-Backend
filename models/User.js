'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: String,
  pointCount: {type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);
