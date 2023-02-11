import { createServer } from 'vite'

import { rebuild } from './rebuild.mjs'
import { highlight, name } from './util/log.mjs'


export const serve = async (target, dest) => {
  const builder = await rebuild(target, dest)

  const server = await createServer({
    root: builder.inputs.destDir(),
    logLevel: 'silent',
    server: {
      open: true,
      host: true,
      port: 3042,
    }
  })

  await server.listen()
  Object.entries(server.resolvedUrls).forEach(([label, url]) => {
    highlight(`serving [${label}]:: `, name(url))
  })
}
