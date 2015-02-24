'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User');

module.exports = function(app) {
  app.use(bodyparser.json());
  app.post('/create_user', function(req, res) {
    var newUser = new User();
    newUser.basic.id = newUser.hashID(req.body.id);
    newUser.save(function(err, user){
      if (err) return res.status(500).send({msg: 'could not create user'});
      res.json({msg: 'user created!'});
    });
  });
}
