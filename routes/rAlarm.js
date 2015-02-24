'use strict';

var bodyparser = require('body-parser');
var Alarm = require('../models/Alarm');
var User = require('../models/User');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, appSecret){
  app.use(bodyparser.json());
  app.post('/create_alarm', eat_auth(appSecret), function(req, res){
    console.log('hit create alarm!');
    var newAlarm = new Alarm();
    newAlarm.alarmTime = req.body.time;
    newAlarm.id = req.body.id;
    newAlarm.save(function(err, alarm){
      if (err) return res.status(500).send({msg: 'could not create alarm'});
      res.json({msg: 'alarm created'});
    });
  });

  app.patch('/check_alarm', eat_auth(appSecret), function(req, res){
    console.log('hit check alarm!');
    var check = 0;
    Alarm.findOne({id: req.body.id}, function(err, alarm){
      console.log('got past findOne');
      if (err) return res.status(500).send({msg: 'could not check alarm'});
      var counter = alarm.counter;
      alarm.wakeTime = req.body.wakeTime;
      if(alarm.compareTimes)
    });
    if(check){
      User.findOne({id: req.body.id}, function(err, user){
        if (err) return res.status(500).send({msg: 'could not check alarm'});
        user.pointCount += 1;
      });
      res.json({msg: 'Congrats! Point for you!'});
    }
    res.json({msg: 'you suck'});
  });
};
