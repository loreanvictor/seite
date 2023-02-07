import highlight from 'rehype-highlight'
import style from './util/style.mjs'
import script from './util/script.mjs'


export default () => tree => {
  highlight()(tree)
  style({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css',
    defer: true,
  })(tree)
  style({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css',
    media: '(prefers-color-scheme: light)',
    defer: true,
  })(tree)
  style('pre code.hljs { padding: var(--code-padding, 1em) }')(tree)
  script(`
  import select from 'https://esm.sh/select'
  import { html, ref } from 'https://esm.sh/rehtm'

  document.querySelectorAll('pre').forEach(pre => {
    const btn = ref()

    const copy = () => {
      select(pre.querySelector('code'))
      document.execCommand('copy')
      btn.current.textContent = '✔'
      setTimeout(() => btn.current.textContent = '📑', 2000)
    }

    pre.append(html\`
      <menu role=toolbar align=right>
        <button ref=\${btn} class=icon onclick=\${copy} aria-label=copy>📑</button>
      </menu>
    \`)
  })
  `)(tree)
}
