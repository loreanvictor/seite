import { h } from 'hastscript'
import { select } from 'hast-util-select'


export default () => tree => {
  if (!select('main', tree)) {
    const { children } = tree
    const sections = []
    let section = h('section', [])

    for (const child of children) {
      if (child.tagName === 'h1' || child.tagName === 'h2') {
        if (section) {
          sections.push(section)
        }

        section = h('section', [child])
      } else if (section) {
        section.children.push(child)
      }
    }

    if (section) {
      sections.push(section)
    }

    tree.children = sections
  }
}
