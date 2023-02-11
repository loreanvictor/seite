import { u } from 'unist-builder'
import { select } from 'hast-util-select'
import darkimg from '../darkimg.mjs'


describe('darkimg', () => {
  test('hides light-mode-only images in dark mode', () => {
    const tree = u('root', [
      u('head', [])
    ])

    darkimg()(tree)
    const s = select('style', tree)

    expect(s.children[0].value.includes('light-mode-only')).toBe(true)
    expect(s.children[0].value.includes('dark-mode-only')).toBe(true)
  })
})
