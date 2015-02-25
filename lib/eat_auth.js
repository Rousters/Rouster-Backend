'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(appSecret) {
  function sendResErr(res, stat, msg) {
    res.status(stat).send({msg: msg});
  }

  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) {
      sendResErr(res, 403, 'no token');
      return;
    }
    eat.decode(token, appSecret, function(err, decoded) {
      if (err) {
        sendResErr(res, 403, 'err while decoding');
        return;
      }
      User.findOne({id: decoded.id}, function(err, user) {
        if (err) {
          sendResErr(res, 403, 'DB read error.');
          return;
        }
        if (!user) {
          sendResErr(res, 403, 'user does not exist');
          return;
        }
        req.user = user;
        next();
      });
    });
  };
};
