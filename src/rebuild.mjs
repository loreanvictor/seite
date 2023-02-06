import { watch } from 'chokidar'

import { build } from './build/index.mjs'
import { inform, name, files } from './util/log.mjs'
import AssetsManager from './assets/index.mjs'


export const rebuild = async (target, dest) => {
  const assets = new AssetsManager()
  await build(target, dest, assets)
  const sources = [target, ...assets.sources()]

  inform('watching', files(sources))

  const watcher = watch(sources).on('change', (path) => {
    inform('change', name(path))
    if (assets.sources().includes(path)) {
      assets.repeat(path)
    } else {
      build(target, dest, assets)
    }
  })

  assets.on('add', (path) => {
    inform('watching', name(path))
    watcher.add(path)
  })

  assets.on('remove', (path) => watcher.unwatch(path))

  return () => watcher.close()
}
