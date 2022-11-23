'use strict';

/**
 * Hook an async function, add before/after bussiness.
 * The before/after use same arguments
 *
 * Example:
 * ```js
 * const query = hook(query, async function (sql) {
 *   console.time(sql);
 * }, async function (sql) {
 *   console.timeEnd(sql);
 * });
 * await query(sql);
 * ```
 * @param {Promise} promise an async function
 * @param {Promise} before execute bussiness logic before the async function.
 * @param {Promise} after execute bussiness logic after the async function.
 */
function hook(promise, before, after) {
  return async function () {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    await before.apply(this, args);

    var results = await promise.apply(this, args);

    await after.apply(this, args);

    return results;
  };
}

/**
 * Hook an async function, add `before` bussiness.
 * The `after` use same arguments
 *
 * Example:
 * ```js
 * var counter = 0;
 * var query = hook.before(query, async function (sql) {
 *   counter++;
 * });
 * await query(sql);
 * ```
 * @param {Promise} promise an async function
 * @param {Promise} before execute bussiness logic before the yieldable.
 */
function before(promise, before) {
  return async function () {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    await before.apply(this, args);
    return await promise.apply(this, args);
  };
}

/**
 * Hook an async function, add `after` bussiness.
 * The `after` use same arguments
 *
 * Example:
 * ```js
 * var counter = 0;
 * var query = after(query, async function (sql) {
 *   counter--;
 * });
 * await query(sql);
 * ```
 * @param {Promise} promise an async function
 * @param {Promise} after execute bussiness logic after the async function done.
 */
function after (promise, after) {
  return async function () {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    const results = await promise.apply(this, args);
    await after.apply(this, args);

    return results;
  };
}

module.exports = {
  hook,
  before,
  after
};
