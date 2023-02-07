import { watch } from 'chokidar'
import { join } from 'path'


export default env => {
  const watcher = watch([
    join(env.root, '**', '_seite.css'),
    join(env.root, '**', '_seite.js'),
  ])

  watcher.on('add', path => {
    env.add(path)
  })

  watcher.on('unlink', path => {
    env.remove(path)
  })

  return watcher
}
