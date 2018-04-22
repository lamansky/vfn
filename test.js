'use strict'

const assert = require('assert')
const vfn = require('.')

describe('vfn()', function () {
  it('should return a function', function () {
    assert.strictEqual(typeof vfn(0, () => {}), 'function')
  })

  it('should collapse excess arguments into the specified beginning argument', function (done) {
    vfn(0, function (extra, middle, last) {
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 2)
      assert.strictEqual(extra[0], 1)
      assert.strictEqual(extra[1], 2)
      assert.strictEqual(middle, 3)
      assert.strictEqual(last, 4)
      done()
    })(1, 2, 3, 4)
  })

  it('should collapse excess arguments into the specified middle argument', function (done) {
    vfn(1, function (first, extra, last) {
      assert.strictEqual(first, 1)
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 2)
      assert.strictEqual(extra[0], 2)
      assert.strictEqual(extra[1], 3)
      assert.strictEqual(last, 4)
      done()
    })(1, 2, 3, 4)
  })

  it('should collapse excess arguments into the specified ending argument', function (done) {
    vfn(2, function (first, middle, extra) {
      assert.strictEqual(first, 1)
      assert.strictEqual(middle, 2)
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 3)
      assert.strictEqual(extra[0], 3)
      assert.strictEqual(extra[1], 4)
      assert.strictEqual(extra[2], 5)
      done()
    })(1, 2, 3, 4, 5)
  })

  it('should arrify variadic argument if there is no excess', function (done) {
    vfn(1, function (first, extra, last) {
      assert.strictEqual(first, 1)
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 1)
      assert.strictEqual(extra[0], 2)
      assert.strictEqual(last, 3)
      done()
    })(1, 2, 3)
  })

  it('should provide empty variadic argument if one argument is missing', function (done) {
    vfn(1, function (first, extra, last) {
      assert.strictEqual(first, 1)
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 0)
      assert.strictEqual(last, 2)
      done()
    })(1, 2)
  })

  it('should provide empty variadic argument if two arguments are missing', function (done) {
    vfn(1, function (first, extra, last) {
      assert.strictEqual(first, 1)
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 0)
      assert.strictEqual(typeof last, 'undefined')
      done()
    })(1)
  })

  it('should do nothing if variadic index exceeds function length', function (done) {
    vfn(1, function (arg) {
      assert.strictEqual(arg, 1)
      done()
    })(1, 2, 3)
  })

  it('should collapse excess into beginning, ignoring options if `oo` is true', function (done) {
    let calls = 0
    const fn = vfn({oo: true}, function (extra, {callDone} = {}) {
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 2)
      assert.strictEqual(extra[0], 1)
      assert.strictEqual(extra[1], 2)
      calls++
      if (callDone) {
        assert.strictEqual(calls, 2)
        done()
      } else {
        assert.strictEqual(calls, 1)
      }
    })

    fn(1, 2)
    fn(1, 2, {callDone: true})
  })

  it('should collapse excess into middle, ignoring options if `oo` is true', function (done) {
    let calls = 0
    const fn = vfn({arg: 1, oo: true}, function (first, extra, last, {callDone} = {}) {
      assert.strictEqual(first, 1)
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 2)
      assert.strictEqual(extra[0], 2)
      assert.strictEqual(extra[1], 3)
      assert.strictEqual(last, 4)
      calls++
      if (callDone) {
        assert.strictEqual(calls, 2)
        done()
      } else {
        assert.strictEqual(calls, 1)
      }
    })

    fn(1, 2, 3, 4)
    fn(1, 2, 3, 4, {callDone: true})
  })

  it('should arrify if no excess, ignoring options if `oo` is true', function (done) {
    let calls = 0
    const fn = vfn({arg: 0, oo: true}, function (extra, {callDone} = {}) {
      assert(Array.isArray(extra))
      assert.strictEqual(extra.length, 1)
      assert.strictEqual(extra[0], 1)
      calls++
      if (callDone) {
        assert.strictEqual(calls, 2)
        done()
      } else {
        assert.strictEqual(calls, 1)
      }
    })

    fn(1)
    fn(1, {callDone: true})
  })
})
