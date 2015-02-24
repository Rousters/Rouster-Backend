'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var userRoutes = require('./routes/rUser');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/alarm_dev');

var app = express();

app.use(passport.initalize());
require('./lib/passport')(passport);

var userRouter = express.Router();

userRoutes(userRouter);

app.use(userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port 3000');
});
