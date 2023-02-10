import { readFile, writeFile } from 'fs/promises'
import { unified } from 'unified'
import { ensureFile } from 'fs-extra'

import { inform, success, files } from '../util/log.mjs'
import time from '../util/time.mjs'
import preset from './preset.mjs'


async function buildOne(target, dest, assets, env) {
  const t = await time(async () => {
    const contents = await readFile(target, 'utf8')
    await ensureFile(dest)

    const processed = await unified()
      .use(
        preset(
          target,
          assets.collect(target, dest),
          env
        )
      )
      .process(contents)

    await writeFile(dest, processed.toString(), 'utf8')
  })

  success('compiled', target + ' -> ' + dest, `(${t})`)
}


export async function build(inputs, assets, env, targets) {
  const sources = targets ?? inputs.sources()
  if (sources.length === 0) {
    inform('nothing to build')
  } else {
    inform('building', files(sources))

    const t = await time(async () => {
      await Promise.all(
        sources.map(async target => {
          const dest = inputs.dest(target)
          await buildOne(target, dest, assets, env)
        })
      )

      await assets.flush()
    })

    success('built', files(sources), `(${t})`)
  }
}
