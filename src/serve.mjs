import { createServer } from 'vite'

import { rebuild } from './rebuild.mjs'
import { highlight, name } from './util/log.mjs'


export const serve = async (target, dest) => {
  const server = await createServer({
    root: process.cwd(),
    logLevel: 'silent',
    server: {
      open: dest,
      host: true,
      port: 3042,
    }
  })
  await server.listen()
  Object.entries(server.resolvedUrls).forEach(([label, url]) => {
    highlight(`serving [${label}]:: `, name(url))
  })

  rebuild(target, dest)
}
