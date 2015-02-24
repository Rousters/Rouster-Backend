// 'use strict';

// var BasicStrategy = require('passport-http').BasicStrategy;
// var User = require('../models/User');

// module.exports = function(passport) {
//   passport.use('basic', new BasicStrategy({}, function(id, done){
//     User.findOne({'basic.id': id}, function(err, user){
//       if (err) return done('could not authenticate');

//       if (!user) return done ('could not authenticate');

//       if (!user.validID(id)) return done('could not authenticate');

//       return done(null, user);
//     });
//   }));
// };
