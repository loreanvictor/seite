import { watch } from 'chokidar'

import { inform, files } from '../util/log.mjs'


export default inputs => {
  inputs.sources().length > 0 && inform('watching', files(inputs.sources()))

  const watcher = watch(inputs.sources(), {
    ignoreInitial: true,
    ignored: inputs.exclude(),
  })

  watcher.on('add', path => {
    inform('new source', path)
    inputs.add(path)
  })

  watcher.on('change', path => {
    inform('change', path)
    inputs.update(path)
  })

  watcher.on('unlink', path => inputs.remove(path))

  return watcher
}
