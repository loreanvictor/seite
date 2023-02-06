import { copy } from 'fs-extra'
import { normalize, join, relative, dirname } from 'path'

import { success } from '../util/log.mjs'
import time from '../util/time.mjs'
import collector from './collector.mjs'


export class Manager {
  #paths = []

  copy(from, to) {
    if (!this.#paths.some(entry => entry.from === from && entry.to === to)) {
      this.#paths.push({ from, to })
    }
  }

  collect(target, dest) {
    const rel = path => normalize(join(relative(dirname(target), dirname(dest)), path))

    return () => collector(path => this.copy(path, rel(path)))
  }

  async flush() {
    await Promise.all(this.#paths.map(async ({ from, to }) => {
      const t = await time(() => copy(from, to))
      success('copied', from + ' -> ' + to, `(${t})`)
    }))
  }
}
