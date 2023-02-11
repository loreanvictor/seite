import { extname } from 'path'

import markdown from 'remark-parse'
import html from 'rehype-parse'
import front from 'remark-frontmatter'
import gfm from 'remark-gfm'
import hype from 'remark-rehype'
import serialize from 'rehype-stringify'
import slug from 'rehype-slug'
import raw from 'rehype-raw'
import doc from 'rehype-document'
import { matter } from 'vfile-matter'

import style from './plugins/style.mjs'
import darkimg from './plugins/darkimg.mjs'
import hlinks from './plugins/hlinks.mjs'
import iconbtns from './plugins/iconbtns.mjs'
import code from './plugins/code.mjs'
import sectionize from './plugins/sectionize.mjs'
import main from './plugins/main.mjs'
import button from './plugins/button.mjs'


const mdprep = () => [
  markdown,
  [front, ['yaml']],
  () => (_, file) => { matter(file) },
  button,
  gfm,
  [hype, {allowDangerousHtml: true}],
]


const htmlprep = () => [
  html,
]


export const parse = (target) => {
  switch (extname(target)) {
  case '.md':
    return mdprep()
  case '.html':
    return htmlprep()
  default:
    throw new Error(`Unknown file extension: ${extname(target)}`)
  }
}


export default (target, assets, env) => [
  ...parse(target),
  slug,
  raw,
  sectionize,
  main,
  doc,
  code,
  [style, {target, env}],
  darkimg,
  hlinks,
  iconbtns,
  assets,
  serialize
]
