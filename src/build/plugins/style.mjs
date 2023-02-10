import { relativise } from '../../util/path.mjs'
import style from './util/style.mjs'


export default ({ target, env }) => {
  return async tree => {
    style({ url: 'https://esm.sh/nokss/dist/nokss.css' })(tree)
    const styles = (await env.get(target)).filter(url => url.endsWith('.css'))
    for (const url of styles) {
      style({ url: relativise(url) })(tree)
    }
  }
}
