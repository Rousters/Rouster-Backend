'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  app.post('/create_user', function(req, res) {
    console.log('post request for /create_user');

    var newUser = new User();
    newUser.id = req.body.id;
    newUser.save(function(err, user){
      if (err) {
        res.status(500).send({msg: 'could not create user'});
        return;
      }
      newUser.generateToken(appSecret, function(err, token){
        if (err) return res.status(500).send({msg: 'could not generate token'});
        res.json({eat: token});
      });
    });
  });
};
