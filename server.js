'use strict';

var express = require('express');
var mongoose = require('mongoose');
var eat = require('eat');
// var passport = require('passport');
var userRoutes = require('./routes/rUser');
var alarmRoutes = require('./routes/rAlarm');


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/alarm_dev');

var app = express();

app.set('appSecret', process.env.SECRET || 'changethis');
// app.use(passport.initalize());
// require('./lib/passport')(passport);


var userRouter = express.Router();
var alarmRouter = express.Router();

userRoutes(userRouter, app.get('appSecret'));
alarmRoutes(alarmRouter, app.get('appSecret'));

app.use(userRouter);
app.use(alarmRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port 3000');
});
