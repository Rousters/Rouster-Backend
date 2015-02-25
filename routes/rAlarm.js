'use strict';

var bodyparser = require('body-parser');
var Alarm = require('../models/Alarm');
var User = require('../models/User');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, appSecret){
  app.use(bodyparser.json());
  app.post('/create_alarm', eat_auth(appSecret), function(req, res){
    var newAlarm = new Alarm();
    newAlarm.alarmTime = req.body.time;
    newAlarm.id = req.body.id;
    newAlarm.save(function(err, alarm){
      if (err) {
        res.status(500).send({msg: 'could not create alarm'});
        return;
      }
      res.json({msg: 'alarm created'});
    });
  });

  app.patch('/check_alarm', eat_auth(appSecret), function(req, res){
    Alarm.findOneAndUpdate({id: req.body.id}, {wakeTime: req.body.wakeTime}, function(err, alarm){
      if (err) {
        res.status(500).send({msg: 'could not check alarm'});
        return;
      }
      if(alarm.compareTimes()){
        console.log('got past comparetimes');
        User.findOneAndUpdate({id: req.body.id}, {$inc: {pointCount: 1}}, function(err, user){
          if (err) {
            res.status(500).send({msg: 'could not add to pointcount'});
          }
          res.json({msg: 'point added!'});

        });
      }
      else {
        res.json({msg: 'you suck'})
      }
    });

  });
};
