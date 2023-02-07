import { join, normalize, dirname } from 'path'
import { access } from 'fs/promises'

import style from './util/style.mjs'


export default (target) => {
  return async tree => {
    const styles = []
    try {
      // TODO: this should be moved to environment management
      const path = normalize(join(dirname(target), '_seite.css'))
      await access(path)
      styles.push('./_seite.css')
    } catch (err) { /* ignore */ }

    style({ url: 'https://esm.sh/nokss/dist/nokss.css' })(tree)
    for (const url of styles) {
      style({ url })(tree)
    }
  }
}
