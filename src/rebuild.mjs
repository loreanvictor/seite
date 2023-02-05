import { watch } from 'chokidar'

import { build } from './build/index.mjs'
import { inform, name } from './util/log.mjs'


export const rebuild = async (target, dest) => {
  await build(target, dest)

  inform('watching', target)
  const watcher = watch(target).on('change', () => {
    inform('change detected', name(target))
    build(target, dest)
  })

  return () => watcher.close()
}
