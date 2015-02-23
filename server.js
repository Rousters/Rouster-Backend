'use strict';

var express = require('express');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/alarm_dev');

var app = express();

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port 3000');
});
