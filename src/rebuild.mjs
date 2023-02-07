import { watch } from 'chokidar'

import { build } from './build/index.mjs'
import { inform, name, files } from './util/log.mjs'
import AssetsManager from './assets/index.mjs'
import EnvManager from './env/index.mjs'


export const rebuild = async (target, dest) => {
  const assets = new AssetsManager()
  const env = new EnvManager()
  await build(target, dest, assets, env)
  const sources = [target]

  inform('watching', files(sources))
  assets.watch()
  env.watch()

  const watcher = watch(sources).on('change', (path) => {
    inform('change', name(path))
    build(target, dest, assets, env)
  })

  env.on('change', change => {
    if (change.affects(target)) {
      inform('change', name(change.path))
      build(target, dest, assets, env)
    }
  })

  return () => {
    watcher.close()
    assets.close()
    env.close()
  }
}
