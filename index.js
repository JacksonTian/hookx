'use strict';

/**
 * Hook a yieldable, add before/after bussiness.
 * The before/after use save arguments
 *
 * Example:
 * ```js
 * var query = hook(query, function * (sql) {
 *   console.time(sql);
 * }, function * (sql) {
 *   console.timeEnd(sql);
 * });
 * yield query(sql);
 * ```
 * @param {Yieldable} yildable a yildable object
 * @param {Generator} before execute bussiness logic before the yieldable.
 * @param {Generator} after execute bussiness logic after the yieldable.
 */
var hook = function (yieldable, before, after) {
  return function * () {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    yield before.apply(this, args);

    var results = yield yieldable.apply(this, args);

    yield after.apply(this, args);

    return results;
  };
};

/**
 * Hook a yieldable, add `before` bussiness.
 * The `after` use save arguments
 *
 * Example:
 * ```js
 * var counter = 0;
 * var query = hook.before(query, function * (sql) {
 *   counter++;
 * });
 * yield query(sql);
 * ```
 * @param {Yieldable} yildable a yildable object
 * @param {Generator} before execute bussiness logic before the yieldable.
 */
hook.before = function (yieldable, before) {
  return function * () {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    yield before.apply(this, args);

    var results = yield yieldable.apply(this, args);

    return results;
  };
};

/**
 * Hook a yieldable, add `after` bussiness.
 * The `after` use save arguments
 *
 * Example:
 * ```js
 * var counter = 0;
 * var query = hook(query, function * (sql) {
 *   counter--;
 * });
 * yield query(sql);
 * ```
 * @param {Yieldable} yildable a yildable object
 * @param {Generator} after execute bussiness logic after the yieldable.
 */
hook.after = function (yieldable, after) {
  return function * () {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    var results = yield yieldable.apply(this, args);

    yield after.apply(this, args);

    return results;
  };
};

module.exports = hook;
