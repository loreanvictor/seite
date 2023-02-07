import { h } from 'hastscript'

import append from './append.mjs'


export default (options) => {
  let node

  if (typeof options === 'string') {
    node = h('style', options)
  } else {
    node = h('link', {
      href: options.url,
      rel: options.defer ? 'preload' : 'stylesheet',
      as: options.defer && 'style',
      onload: options.defer && 'this.onload=null;this.rel="stylesheet"'
    })
  }

  return append(node)
}
