const { test, describe } = require('node:test')
const assert = require('node:assert/strict')
const createPreset = require('.')

test('it works', () => {
  createPreset()
})

describe('parse default theme', () => {
  const result = createPreset()

  test('result has colors', () => {
    assert(Object.entries(result.theme.colors).length > 0)
  })

  test('result has extend colors', () => {
    assert(Object.entries(result.theme.extend.colors).length > 0)
  })

  test('result has font size', () => {
    assert(Object.entries(result.theme.fontSize).length > 0)
  })

  test('result has border radius', () => {
    assert(Object.entries(result.theme.borderRadius).length > 0)
  })

  test('result has padding', () => {
    assert(Object.entries(result.theme.extend.padding).length > 0)
  })

  test('result has margin', () => {
    assert(Object.entries(result.theme.extend.margin).length > 0)
  })

  test('result has size', () => {
    assert(Object.entries(result.theme.extend.size).length > 0)
  })

  test('result has box shadow', () => {
    assert(Object.entries(result.theme.extend.boxShadow).length > 0)
  })

  test('result has screens', () => {
    assert(Object.entries(result.theme.screens).length > 0)
  })

  test('result has line height', () => {
    assert(Object.entries(result.theme.extend.lineHeight).length > 0)
  })
})
