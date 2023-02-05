import { dirname } from 'path'
import { createServer } from 'vite'

import { rebuild } from './rebuild.mjs'
import { success, name } from './util/log.mjs'


export const serve = async (target, dest) => {
  const server = await createServer({
    root: dirname(dest),
    logLevel: 'silent',
    server: {
      host: true,
      port: 3042,
    }
  })
  await server.listen()
  Object.entries(server.resolvedUrls).forEach(([label, url]) => {
    success(`⚡ serving [${label}]`, ':: ' + name(url))
  })

  rebuild(target, dest)
}
