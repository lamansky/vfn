# Variadic Function (vfn)

Lets you specify a “[rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)” that’s _not_ at the end.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i vfn
```

## API

The module exports a single function.

### Parameters

1. `i` (positive integer): The zero-based index of which parameter in `fn`’s parameters list should be the “rest parameter.”
2. `fn` (function): The function that has a parameter you want to convert into a “rest parameter.”

### Return Value

A wrapper function that turns all excess arguments into an array which is passed to `fn` at parameter index `i`.

## Example

JavaScript supports “rest parameters,” but only at the end. Anything else will throw an error:

```javascript
function func (...a, b, c) {} // Uncaught SyntaxError: Rest parameter must be last formal parameter
```

The `vfn` module lets you accomplish this. The index of `a` in the parameters list is `0`, so we pass `0` as the first argument to `vfn()`:

```javascript
const vfn = require('vfn')

const func = vfn(0, function (a, b, c) {})

func(1, 2, 3, 4, 5) // a = [1, 2, 3]; b = 4; c = 5
func(1, 2, 3) // a = [1]; b = 2; c = 3
func('test', 'example') // a = []; b = 'test'; c = 'example'
func('hello world') // a = []; b = 'hello world'; c = undefined
```

## Related

For more projects like this, check out [@lamansky/fn](https://github.com/lamansky/fn).
