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
  it('post on /create_user should create a user', function(done) {
    chai.request(server)
      .post('/create_user')
      .send({id: id, username: 'richard', password: 'password'})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  describe('/user/id route spec', function() {
    it('put on /user/id should modify user schema data', function(done) {
      chai.request(server)
        .put('/user/' + id)
        .send({password: 'password'})
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('delete on /user/id should remove user information', function(done) {
      chai.request(server)
        .delete('/user' + id)
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
      });    
  });


  describe('/user/id/alarm specific route'), function() {
    var id;
    before(function(done) { // jshint ignore: line
      chai.request(server)
        .post('/create_user')
        .send({email: 'email', password: 'password'})
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });
    it('post should create app information for a user', function(done) {
      chai.request(server)
        .post('/user/' + id + '/alarm')
        .send({alarmTime: '08:00', wakeTime: '', score: 0})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body[0]).to.have.property('alarmTime');
          expect(res.body[0]).to.have.property('wakeTime');
          expect(res.body[0]).to.have.property('score');
          expect(res.body[0]).to.have.property('id');
          done();
        });
    });
    it('put should update app/alarm schma data, and an return updated data', function(done) {
      chai.request(server)
        .put('/user/' + id + '/alarm')
        .send({alarmTime: '08:00', wakeTime: '08:05', score: 1})
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body[0].alarmTime).to.eql('08:00')
          expect(res.body[0].wakeTime).to.eql('08:05')
          expect(res.body[0].score).to.eql(1);
          expect(res.body[0]).to.have.property('id');
          done();
        });
    });
    after(function(done) {
      chai.request(server)
        .delete('/user' + id)
        .end(function(err, res){
          done();
        });
      });
    });
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

});
