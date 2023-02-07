import { watch } from 'chokidar'

import { inform, files } from '../util/log.mjs'


export default assets => {
  assets.sources().length > 0 && inform('watching', files(assets.sources()))
  const watcher  = watch(assets.sources())

  watcher.on('change', (path) => {
    inform('change', path)
    assets.repeat(path)
  })

  assets.on('add', (path) => {
    inform('watching', path)
    watcher.add(path)
  })

  assets.on('remove', (path) => watcher.unwatch(path))

  return watcher
}
