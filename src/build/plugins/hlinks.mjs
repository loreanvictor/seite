import { selectAll } from 'hast-util-select'
import { h } from 'hastscript'


export default () => tree => {
  selectAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]', tree).forEach(heading => {
    heading.children.unshift(
      h('menu', {role: 'toolbar'}, [
        h('button', {
          class: 'icon',
          'aria-label': 'copy link',
          onclick: `
            navigator.clipboard.writeText(
              location.protocol + '//' + location.host + location.pathname + '#' + '${heading.properties.id}'
            ).then(() => {
              this.textContent = '✔'
              setTimeout(() => this.textContent = '🔗', 2000)
            })
          `
        }, '🔗')
      ])
    )
  })
}
