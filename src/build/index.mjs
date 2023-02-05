import { readFile, writeFile } from 'fs/promises'
import { unified } from 'unified'

import { ensureDir } from '../util/ensure-dir.mjs'
import { inform, success } from '../util/log.mjs'
import preset from './preset.mjs'


export async function build(target, dest) {
  inform('building', target + ' -> ' + dest)
  const t0 = performance.now()

  const contents = await readFile(target, 'utf8')
  await ensureDir(dest)

  const processed = await unified()
    .use(preset)
    .process(contents)

  await writeFile(dest, processed.toString(), 'utf8')

  const t1 = performance.now()
  success(`built (${(t1 - t0).toFixed(1)}ms)`, target + ' -> ' + dest)
}
