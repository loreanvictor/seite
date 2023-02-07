import { h } from 'hastscript'

import append from './append.mjs'


export default (options) => {
  let node

  if (typeof options === 'string') {
    node = h('script', {type: 'module', defer: true}, options)
  } else {
    node = h('script', {
      src: options.url,
      defer: options.defer,
      async: options.async,
      type: options.type || 'module',
    }, options.content)
  }

  return append(node)
}
