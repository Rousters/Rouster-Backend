'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');

module.exports = function(app) {

  app.use(bodyparser.json());

  app.post('/create_user', function(req, res) {
    console.log('post request for /create_user');

    var newUser = new User();
    newUser.basic.id = newUser.hashID(req.body.id);
    newUser.save(function(err, user){
      if (err) {
        res.status(500).send({msg: 'could not create user'});
        return;
      }
      res.json({msg: 'user created!'});
    });
  });
  
}
