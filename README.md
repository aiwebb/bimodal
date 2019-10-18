# Ω: the Omega function

`Ω` is an experiment in replacing `try`/`catch` boilerplate with an `[err, result]` array, inspired by [error return values in Go](https://gobyexample.com/errors).


## Installation
```bash
# npm
npm i --save omega-fn

# yarn
yarn add omega-fn
```


## Usage
```js
const Ω = require('omega-fn')

const [err, result] = await Ω (fnThatMayThrowError, arg1, arg2, ...)
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
let [err, result] = await Ω (fnThatMayThrowError)

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


## Why Ω?

- `Ω` represents *finality*, and this function is conceptually similar to a `finally` block
- it's keyboard-friendly (at least on a Mac: `option`+`z`)
- since the goal is hiding as much annoying syntax as possible, I wanted something that was only a single character
- unclaimed single-char non-alpha keyboard-friendly valid JS identifiers are in ***very*** short supply (thanks a lot, `$` and `_`)


If you're weirded out by it, you can always call it something else:
- `const omega    = require('omega-fn')`
- `const channels = require('omega-fn')`
- `const potato   = require('omega-fn')`