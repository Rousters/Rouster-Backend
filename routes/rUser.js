'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var eatAuth = require('../lib/eat_auth');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  /**
   *      Route Callback: Route to create a user from Apple id data.
   *
   * @param  {Object} req  The request object.
   * @param  {Object} res  The response object.
   * @return {Undefined}   Will only return undefined in the event of a DB read error.
   */
  app.post('/create_user', function(req, res) {
    var newUser = new User();
    newUser.id = req.body.id;
    newUser.save(function(err, user) {
      if (err) {
        res.status(500).send({msg: 'could not create user'});
        return;
      }

      newUser.generateToken(appSecret, function(err, token) {
        if (err) {
          res.status(500).send({msg: 'could not generate token'});
          return;
        }
        res.json({eat: token});
      });
    });
  });

  /**
   *      Route Callback: Fetches the pointCount from the user schema.
   *
   * @param  {Object} req  The request object.
   * @param  {Object} res  The response object.
   * @return {undefined}   Only returns on DB read error.
   */
  app.get('/get_points', eatAuth(appSecret), function(req, res) {
    User.findOne({id: req.headers.id}, function(err, user) {
      if (err) {
        res.status(500).send({msg: 'could not get user'});
        return;
      }
      if (!user.getPercent()) {
        res.json({msg: 'no points for user'});
      } else {
        res.json({pointCount: user.pointCount, percentage: user.getPercent()});
      }
    });
  });
};
