import { readFile, writeFile } from 'fs/promises'
import { unified } from 'unified'
import { ensureFile } from 'fs-extra'

import { inform, success } from '../util/log.mjs'
import time from '../util/time.mjs'
import AssetManager from '../assets/index.mjs'
import EnvManager from '../env/index.mjs'
import preset from './preset.mjs'


export async function build(target, dest, assets, env) {
  assets ??= new AssetManager()
  env ??= new EnvManager()
  inform('building', target + ' -> ' + dest)

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
    await assets.flush()
  })

  success('built', target + ' -> ' + dest, `(${t})`)
}
