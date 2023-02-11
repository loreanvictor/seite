import { h } from 'hastscript'
import { select } from 'hast-util-select'


export default () => (tree) => {
  if (!select('main', tree) && !select('document', tree)) {
    tree.children = [h('main', tree.children)]
  }
}
