'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) return res.status(403).send({msg: 'no token'});

    eat.decode(token, appSecret, function(err, decoded) {
      if (err) return res.status(403).send({msg: 'err while decoding'});

      User.findOne({id: decoded.id}, function(err, user) {
        if (err) return res.status(403).send({msg: 'err for findOne'});

        if(!user) return res.status(403).send({msg: 'user does not exist'});

        req.user = user;
        next();
      });
    });
  };
};
