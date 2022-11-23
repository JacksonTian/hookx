'use strict';

const assert = require('assert');

const {hook, before, after} = require('../');

describe('hook', function () {
  it('after should ok', async function () {
    var fnx = after(function (obj) {
      obj.counter = 1;
      return obj;
    }, async function (obj) {
      obj.counter++;
    });
    var result = await fnx({});
    assert.deepStrictEqual(result.counter, 2);
  });

  it('before should ok', async function () {
    const fnx = before(async function (obj) {
      obj.counter--;
      return obj;
    }, async function (obj) {
      obj.counter = 1;
    });
    var result = await fnx({});
    assert.deepStrictEqual(result.counter, 0);
  });

  it('hook should ok', async function () {
    var fnx = hook(async function (obj) {
      obj.counter++;
      return obj;
    }, async function (obj) {
      obj.counter = 0;
    }, async function (obj) {
      obj.counter++;
    });
    var result = await fnx({});
    assert.deepStrictEqual(result.counter, 2);
  });
});
