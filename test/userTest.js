'use strict';

process.env.MONGO_URI = 'mongodb://localhost/alarm_dev';
require('../server');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);

var server = 'localhost:3000'

describe('/create_user, /user, and /user/id/alarm routes spec', function() {
  var id = 'testID';

  describe('/check_alarm specific route', function() {
    var token;
    before(function(done) { // jshint ignore: line
      chai.request(server)
        .post('/create_user')
        .send({id: id})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res).to.have.property('eat');
          token = res.body.eat;
          done();
        });
    });
    it('post should create alarm information for a user', function(done) {
      chai.request(server)
        .post('/create_alarm')
        .send({time: 100, id: id, eat: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('alarm created');
          done();
        });
    });
    it('patch should update app/alarm schma data, and an return message', function(done) {
      chai.request(server)
        .patch('/check_alarm')
        .send({id: id, eat: token, wakeTime: 104})
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('point added!');
          done();
        });
    });
    it('patch should update app/alarm schma data, and an return message', function(done) {
      chai.request(server)
        .patch('/check_alarm')
        .send({id: id, eat: token, wakeTime: 110})
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('you suck');
          done();
        });
    });
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
});

