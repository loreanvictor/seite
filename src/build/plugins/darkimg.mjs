import style from './util/style.mjs'


export default () => style(`
@media (prefers-color-scheme: dark) {
  :is([href$="light-mode-only"], [src$="light-mode-only"]) {
    display: none;
  }
}

@media (prefers-color-scheme: light) {
  :is([href$="dark-mode-only"], [src$="dark-mode-only"]) {
    display: none;
  }
}
`)
