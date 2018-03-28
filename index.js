'use strict'

const arrayPad = require('array-pad')
const wfn = require('wfn')

module.exports = (i, fn) => wfn(fn, function vfn () {
  const args = arrayPad(Array.from(arguments), i)
  args.splice(i, 0, arguments.length < fn.length ? [] : args.splice(i, arguments.length - fn.length + 1))
  return fn.apply(this, args) // eslint-disable-line no-invalid-this
})
