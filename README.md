# bimodal

`bimodal` is an experiment in replacing `try`/`catch` boilerplate with an `[err, result]` array, inspired by [error return values in Go](https://gobyexample.com/errors).


## Installation
```bash
# npm
npm i --save bimodal

# yarn
yarn add bimodal
```


## Usage
```js
const bimodal = require('bimodal')

const [err, result] = await bimodal (fnThatMayThrowError, arg1, arg2, ...)
```


## Rationale

This is annoying:

```js
let result

try {
  result = await fnThatMayThrowError()
}
catch (err) {
  // ...
}

// use result
```

This is nicer:
```js
let [err, result] = await bimodal (fnThatMayThrowError)

if (err) {
  // ...
}

// use result
```


## What's it doing?

Not much:

```js
module.exports = async (fn, ...args) => {
  const channels = [undefined, undefined]

  try {
    channels[1] = await fn.apply(null, args)
  }
  catch (err) {
    channels[0] = err
  }
  finally {
    return channels
  }
}
```
