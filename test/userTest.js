'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);

describe('user route spec', function() {
  it('has a default index');
  it('creates a new user');
  it('authenticates a user');
  describe('app specific database functionality', function() {
    it('saves a global daily alarm time');
    it('saves daily wake time');
  });

});
