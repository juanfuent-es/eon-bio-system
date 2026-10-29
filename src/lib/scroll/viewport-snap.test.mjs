import assert from 'node:assert/strict'
import test from 'node:test'
import { ViewportSnapTracker } from './viewport-snap.ts'

const panel = (top, height = 1000) => [{ id: 'ricardo', top, bottom: top + height }]

test('aligns only after 80% enters the viewport', () => {
  const tracker = new ViewportSnapTracker()
  assert.equal(tracker.update(panel(201), 1000, 1000), null)
  assert.deepEqual(tracker.update(panel(200), 1000, 1000), { id: 'ricardo', top: 1200 })
})

test('releases the panel without pulling back, then rearms on return from either direction', () => {
  const tracker = new ViewportSnapTracker()
  tracker.commit('ricardo')
  assert.equal(tracker.update(panel(-100), 1000, 1300), null)
  assert.equal(tracker.update(panel(-201), 1000, 1401), null)
  assert.deepEqual(tracker.update(panel(-200), 1000, 1400), { id: 'ricardo', top: 1200 })
  tracker.commit('ricardo')
  assert.equal(tracker.update(panel(201), 1000, 999), null)
  assert.deepEqual(tracker.update(panel(200), 1000, 1000), { id: 'ricardo', top: 1200 })
})

test('a testimonial taller than the viewport aligns the entering edge and remains readable', () => {
  const tracker = new ViewportSnapTracker()
  assert.deepEqual(tracker.update(panel(200, 1600), 1000, 1000), { id: 'ricardo', top: 1200 })
  tracker.commit('ricardo')
  assert.equal(tracker.update(panel(-300, 1600), 1000, 1500), null)
  assert.equal(tracker.update(panel(-801, 1600), 1000, 2001), null)
  assert.deepEqual(tracker.update(panel(-800, 1600), 1000, 2000), { id: 'ricardo', top: 1800 })
})

test('an already aligned panel does not snap again when the reader starts leaving', () => {
  const tracker = new ViewportSnapTracker()
  assert.equal(tracker.update(panel(0), 1000, 1200), null)
  assert.equal(tracker.update(panel(-50), 1000, 1250), null)
})

test('free text sections, the closing block and footer do not create snap destinations', () => {
  const tracker = new ViewportSnapTracker()
  assert.equal(tracker.update([], 1000, 5000), null)
  assert.equal(tracker.update(panel(-1000), 1000, 5000), null)
})

test('fast scrolling into a long testimonial never jumps over its content', () => {
  const tracker = new ViewportSnapTracker()
  assert.equal(tracker.update(panel(-100, 1600), 1000, 1300), null)
  assert.equal(tracker.update(panel(-400, 1600), 1000, 1600), null)
})

test('the controller snaps after scrollend, releases for new input and respects reduced motion', async () => {
  const { readFileSync } = await import('node:fs')
  const { runInNewContext } = await import('node:vm')
  const { default: ts } = await import('typescript')
  const source = readFileSync(new URL('../../components/elements/viewport-scroll-snap.tsx', import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } })
  const attributes = () => ({
    values: new Set(),
    setAttribute(name) {
      this.values.add(name)
    },
    removeAttribute(name) {
      this.values.delete(name)
    },
  })
  const root = attributes()
  let top = 250
  const section = { ...attributes(), id: 'ricardo', getBoundingClientRect: () => ({ top, bottom: top + 1000 }) }
  const handlers = new Map()
  const calls = []
  let frame, timer, cleanup, motionChange
  const motion = {
    matches: false,
    addEventListener: (_, fn) => {
      motionChange = fn
    },
    removeEventListener() {},
  }
  const window = {
    innerHeight: 1000,
    scrollY: 0,
    matchMedia: () => motion,
    addEventListener: (name, fn) => handlers.set(name, fn),
    removeEventListener: (name) => handlers.delete(name),
    scrollTo: (options) => calls.push(options),
  }
  const exports = {}
  runInNewContext(outputText, {
    exports,
    require: (name) =>
      name === 'react'
        ? {
            useEffect: (fn) => {
              cleanup = fn()
            },
          }
        : { ViewportSnapTracker },
    document: { documentElement: root, querySelectorAll: () => [section] },
    window,
    ResizeObserver: class {
      observe() {}
      disconnect() {}
    },
    requestAnimationFrame: (fn) => {
      frame = fn
      return 1
    },
    cancelAnimationFrame: () => {
      frame = undefined
    },
    setTimeout: (fn) => {
      timer = fn
      return 1
    },
    clearTimeout: () => {
      timer = undefined
    },
  })
  const flushFrame = () => {
    const fn = frame
    frame = undefined
    fn?.()
  }
  const settle = () => {
    const fn = timer
    timer = undefined
    fn?.()
  }
  exports.ViewportScrollSnap()
  flushFrame()
  assert.equal(timer, undefined)
  top = 200
  handlers.get('scroll')()
  flushFrame()
  handlers.get('scrollend')()
  assert.equal(typeof timer, 'function', 'scrollend must not cancel the pending snap')
  settle()
  assert.ok(root.values.has('data-viewport-snap-active'))
  assert.equal(calls.at(-1).top, 200)
  assert.equal(calls.at(-1).behavior, 'smooth')
  handlers.get('wheel')()
  assert.ok(!root.values.has('data-viewport-snap-active'))
  top = 150
  handlers.get('scroll')()
  flushFrame()
  assert.equal(timer, undefined, 'leaving an aligned panel must not pull the reader back')
  motion.matches = true
  motionChange()
  flushFrame()
  assert.equal(timer, undefined)
  cleanup()
  assert.equal(handlers.size, 0)
})
