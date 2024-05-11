const createPreset = require('.')

test('it works', () => {
  createPreset()
})

describe('parse default theme', () => {
  const result = createPreset()

  test('result has colors', () => {
    expect(Object.entries(result.theme.colors).length).toBeGreaterThan(0)
  })

  test('result has extend colors', () => {
    expect(Object.entries(result.theme.extend.colors).length).toBeGreaterThan(0)
  })

  test('result has font size', () => {
    expect(Object.entries(result.theme.fontSize).length).toBeGreaterThan(0)
  })

  test('result has border radius', () => {
    expect(Object.entries(result.theme.borderRadius).length).toBeGreaterThan(0)
  })

  test('result has padding', () => {
    expect(Object.entries(result.theme.extend.padding).length).toBeGreaterThan(0)
  })

  test('result has margin', () => {
    expect(Object.entries(result.theme.extend.margin).length).toBeGreaterThan(0)
  })

  test('result has size', () => {
    expect(Object.entries(result.theme.extend.size).length).toBeGreaterThan(0)
  })

  test('result has box shadow', () => {
    expect(Object.entries(result.theme.extend.boxShadow).length).toBeGreaterThan(0)
  })

  test('result has screens', () => {
    expect(Object.entries(result.theme.screens).length).toBeGreaterThan(0)
  })

  test('result has line height', () => {
    expect(Object.entries(result.theme.extend.lineHeight).length).toBeGreaterThan(0)
  })
})
