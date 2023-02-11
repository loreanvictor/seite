import { visit } from 'unist-util-visit'


export default () => tree => {
  visit(tree, 'link', (node) => {
    if (node.children[0].type === 'text' && node.children[0].value.startsWith('▷')) {
      node.data = {
        hProperties: {
          role: 'button',
          class: 'btn',
          style: 'text-decoration: none'
        }
      }
    }
  })
}
