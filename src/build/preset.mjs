import parse from 'remark-parse'
import front from 'remark-frontmatter'
import hype from 'remark-rehype'
import html from 'rehype-stringify'
import raw from 'rehype-raw'
import wrap from 'rehype-wrap'
import doc from 'rehype-document'
import { matter } from 'vfile-matter'


export default [
  parse,
  [front, ['yaml']],
  () => (_, file) => { matter(file) },
  [hype, {allowDangerousHtml: true}],
  raw,
  [wrap, {wrapper: 'main'}],
  [doc, {
    link: {
      rel: 'stylesheet',
      href: 'https://unpkg.com/nokss',
    },
    style: `
      :root {
        --primary-color: var(--color);
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --background-color: #080809;
        }
      }
    `
  }],
  html
]
