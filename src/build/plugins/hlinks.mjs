import script from './script.mjs'


export default () => script(`
  import { html, ref } from 'https://esm.sh/rehtm'

  document.querySelectorAll(':is(h1, h2, h3, h4, h5, h6)[id]').forEach(heading => {
    const id = heading.id
    const btn = ref()
    const copy = async () => {
      await navigator.clipboard.writeText(location.protocol + '//' + location.host + location.pathname + '#' + id)
      btn.current.textContent = '✔'
      setTimeout(() => btn.current.textContent = '🔗', 2000)
    }

    heading.append(html\`
      <menu role=toolbar>
        <button ref=\${btn} onclick=\${copy} aria-label="copy link" class=icon>
          🔗
        </button>
      </menu>
    \`)
  })
`)
