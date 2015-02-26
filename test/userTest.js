'use strict';

process.env.MONGO_URI = 'mongodb://localhost/alarm_dev';
require('../server');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);

describe('/create_user, /user, and /alarm routes spec', function() {
  var id = 'testID';
  var server = 'localhost:3000';

  describe('/check_alarm specific route', function() {
    var token;
    before(function(done) { // jshint ignore: line
      chai.request(server)
        .post('/create_user')
        .send({id: id})
        .end(function(err, res) {
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

    it('patch should add point if wake time met', function(done) {
      chai.request(server)
        .patch('/check_alarm')
        .send({id: id, eat: token, wakeTime: 104})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('point added!');
          done();
        });
    });

    it('get should return point count and percentage', function(done) {
      chai.request(server)
        .get('/get_points')
        .send({id: id, eat: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('pointCount');
          expect(res.body).to.have.property('percentage');
          done();
        });
    });

    describe('patch should add negative point if time not met', function() {
      before(function(done) {
        chai.request(server)
            .post('/create_alarm')
            .send({id: id, eat: token, time: 100})
            .end(function(err, res) {
              done();
            });
      });
      it('patch should not add point if wake time not met', function(done) {
        chai.request(server)
          .patch('/check_alarm')
          .send({id: id, eat: token, wakeTime: 401})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body.msg).to.eql('you suck');
            done();
          });
        });
    });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});
