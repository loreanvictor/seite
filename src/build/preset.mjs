import parse from 'remark-parse'
import front from 'remark-frontmatter'
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


export default (assets) => [
  parse,
  [front, ['yaml']],
  () => (_, file) => { matter(file) },
  [hype, {allowDangerousHtml: true}],
  slug,
  raw,
  [wrap, {wrapper: 'main'}],
  doc,
  [style, { url: 'https://esm.sh/nokss/dist/nokss.css' }],
  darkimg,
  hlinks,
  iconbtns,
  assets,
  html
]
