'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());
  app.post('/create_user', function(req, res) {
    console.log('hit user');
    var newUser = new User();
    newUser.id = req.body.id;
    newUser.save(function(err, user){
      if (err) return res.status(500).send({msg: 'could not create user'});

      newUser.generateToken(appSecret, function(err, token){
        if (err) return res.status(500).send({msg: 'could not generate token'});
        res.json({eat: token});
      });
    });
  });

  app.get('/get_points', eat_auth(appSecret), function(req, res) {
    console.log('hit get user');
    User.findOne({id: req.body.id}, function(err, user){
      if (err) return res.status(500).send({msg: 'could not get user'});
      res.json({pointCount: user.pointCount});
    });
  });
};
