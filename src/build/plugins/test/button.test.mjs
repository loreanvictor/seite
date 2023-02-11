import { u } from 'unist-builder'
import { selectAll } from 'unist-util-select'
import button from '../button.mjs'


describe('button', () => {
  test('adds proper attributes to button-like links', () => {
    const tree = u('root', [
      u('paragraph', [
        u('link', { url: '/foo' }, [u('text', '▷ Foo')]),
        u('text', ' '),
        u('link', { url: '/bar' }, [u('text', 'Bar')]),
      ])
    ])

    button()(tree)

    const [a, b] = selectAll('link', tree)

    expect(a.data.hProperties).toEqual({
      role: 'button',
      class: 'btn',
      style: 'text-decoration: none'
    })

    expect(b.data).toBeUndefined()
  })
})
