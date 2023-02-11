import { visit } from 'unist-util-visit'


export default () => tree => {
  visit(tree, 'link', (node) => {
    if (node.children[0].type === 'text' && node.children[0].value.startsWith('▷')) {
      node.children[0].value = node.children[0].value.slice(1)
      node.data = {
        hProperties: {
          role: 'button',
          style: 'text-decoration: none'
        }
      }
    }
  })
}
