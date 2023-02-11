import { u } from 'unist-builder'
import { select } from 'hast-util-select'
import hlinks from '../hlinks.mjs'


describe('hlinks', () => {
  test('adds a script for linking buttons to headings.', () => {
    const tree = u('root', [
      u('head', [])
    ])

    hlinks()(tree)
    const s = select('script', tree)

    expect(s.children[0].value.includes('h1, h2, h3')).toBe(true)
  })

  // TODO: add a test to check if the script works as intended.
})
