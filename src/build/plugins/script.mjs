import { h } from 'hastscript'
import { select } from 'hast-util-select'


export default (options) => {
  let node

  if (typeof options === 'string') {
    node = h('script', {type: 'module'}, options)
  } else {
    node = h('script', {
      src: options.url,
      defer: options.defer,
      async: options.async,
      type: options.type || 'module',
    }, options.content)
  }

  return (tree) => {
    const head = select('head', tree)
    head.children.push(node)
  }
}
