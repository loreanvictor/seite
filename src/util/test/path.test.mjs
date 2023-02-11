import { relativise } from '../path.mjs'


describe(relativise, () => {
  test('makes sure a relative path is returned.', () => {
    expect(relativise('x')).toBe('./x')
    expect(relativise('./x')).toBe('./x')
    expect(relativise('../x')).toBe('../x')
  })
})
