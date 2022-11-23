# hookx
Hook(x) with Power.

[![NPM version][npm-image]][npm-url]
[![build status][github-action-image]][github-action-url]
[![codecov][cov-image]][cov-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/hookx.svg?style=flat-square
[npm-url]: https://npmjs.org/package/hookx
[github-action-image]: https://img.shields.io/travis/JacksonTian/hookx.svg?style=flat-square
[github-action-url]: https://travis-ci.org/JacksonTian/hookx
[cov-image]: https://codecov.io/gh/JacksonTian/hookx/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/JacksonTian/hookx
[download-image]: https://img.shields.io/npm/dm/hookx.svg?style=flat-square
[download-url]: https://npmjs.org/package/hookx

## Installation

Install it with npm first.

```sh
$ npm install hookx --save
```

## Usage
Require it first.

```js
const { hook, before, after } = require('hookx');
```

You should have an async function defined like this:

```js
var query = async function (sql) {
  // TODO
};
```

Hook it with `before` and `after` business logic.

```js
var query = hook(query, async function (sql) {
  console.time(sql);
}, async function (sql) {
   console.timeEnd(sql);
});
await query(sql); // call the hooked async function like origin
```

Hook with `before` business logic.

```js
var counter = 0;
var query = before(query, async function (sql) {
  counter++;
});
await query(sql);
```

Hook with `after` business logic.

```js
var counter = 0;
var query = after(query, async function (sql) {
  counter--;
});
await query(sql);
```

## License
The MIT license.
