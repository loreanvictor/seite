import parse from 'remark-parse'
import front from 'remark-frontmatter'
import gfm from 'remark-gfm'
import hype from 'remark-rehype'
import html from 'rehype-stringify'
import slug from 'rehype-slug'
import raw from 'rehype-raw'
import wrap from 'rehype-wrap'
import doc from 'rehype-document'
import { matter } from 'vfile-matter'

import style from './plugins/style.mjs'
import darkimg from './plugins/darkimg.mjs'
import hlinks from './plugins/hlinks.mjs'
import iconbtns from './plugins/iconbtns.mjs'
import code from './plugins/code.mjs'
import sectionize from './plugins/sectionize.mjs'


export default (target, assets, env) => [
  parse,
  [front, ['yaml']],
  () => (_, file) => { matter(file) },
  gfm,
  [hype, {allowDangerousHtml: true}],
  slug,
  raw,
  sectionize,
  [wrap, {wrapper: 'main'}],
  doc,
  code,
  [style, {target, env}],
  darkimg,
  hlinks,
  iconbtns,
  assets,
  html
]
