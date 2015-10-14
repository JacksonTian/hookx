'use strict';

var expect = require('expect.js');
var hook = require('../');

describe('hook', function () {
  it('after should ok', function* () {
    var fnx = hook.after(function * (obj) {
      obj.counter = 1;
      return obj;
    }, function * (obj) {
      obj.counter++;
    });
    var result = yield fnx({});
    expect(result.counter).to.be(2);
  });

  it('before should ok', function* () {
    var fnx = hook.before(function * (obj) {
      obj.counter--;
      return obj;
    }, function * (obj) {
      obj.counter = 1;
    });
    var result = yield fnx({});
    expect(result.counter).to.be(0);
  });

  it('hook should ok', function* () {
    var fnx = hook(function * (obj) {
      obj.counter++;
      return obj;
    }, function * (obj) {
      obj.counter = 0;
    }, function * (obj) {
      obj.counter++;
    });
    var result = yield fnx({});
    expect(result.counter).to.be(2);
  });
});
