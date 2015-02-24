'use strict';

process.env.MONGO_URI = 'mongodb://localhost/alarm_dev';
require('../server');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);

describe('user route spec', function() {

  before(function(done) {
    chai.request('localhost:3000')
      .post('/create_user')
      .send({id: 'testID'})
      .end(function(err, res){
        expect(err).to.eql(null);
        done();
      });
  });

  it('has a default index');
  // it('creates a new user');
  // it('authenticates a user');
  // describe('app specific database functionality', function() {
  //   it('saves a global daily alarm time');
  //   it('saves daily wake time');
  // });

  // after(function(done){
  //   mongoose.connection.db.dropDatabase(function(){
  //     done();
  //   });
  // });

});
