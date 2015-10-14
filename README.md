# hookx
Hook(x) with Power.

## Installation

Install it with npm first.

```sh
$ npm install hookx --save
```

## Usage
require it first. 

```js
var hook = require('hookx');
```

you should have a yieldable instance defined like this:

```js
var query = function * (sql) {
  // TODO
};
```

Hook it with before and after business logic.

```js
var query = hook(query, function * (sql) {
  console.time(sql);
}, function * (sql) {
   console.timeEnd(sql);
});
yield query(sql); // call the hooked function like origin
```

Hook with before business logic.

```js
var counter = 0;
var query = hook.before(query, function * (sql) {
  counter++;
});
yield query(sql);
```

Hook with `after` business logic.

```js
var counter = 0;
var query = hook(query, function * (sql) {
  counter--;
});
yield query(sql);
```

## License
The MIT license.
