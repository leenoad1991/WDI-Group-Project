process.env.NODE_ENV = 'test';

const chai = require('chai');
const supertest = require('supertest');
const app = require('../index');

global.should = chai.should();
global.expect = chai.expect();

module.exports = {
  api: supertest(app),
  expect: chai.expect,
  should: chai.should
};
