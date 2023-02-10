import { copy } from 'fs-extra'
import { join, relative, dirname } from 'path'

import { success, error } from '../util/log.mjs'
import time from '../util/time.mjs'
import collector from './collector.mjs'


export class Manager {
  #paths = []
  #flushed = []
  #addlisteners = []
  #removelisteners = []

  copy(from, to) {
    if (!this.#paths.some(entry => entry.from === from && entry.to === to)) {
      this.#paths.push({ from, to })
    }
  }

  collect(target, dest) {
    const relf = path => join(dirname(target), path)
    const relto = path => join(dirname(target), relative(dirname(target), dirname(dest)), path)

    return () => collector(path => this.copy(relf(path), relto(path)))
  }

  async flush() {
    await Promise.all(
      this.#paths
        .filter(({from, to}) => !this.flushed(from, to))
        .map(async ({ from, to }) => this.#copy(from, to))
    )

    this.#emitDiff()
    this.#flushed = [...this.#paths]
    this.#paths = []
  }

  flushed(from, to) {
    return this.#flushed.some(entry => entry.from === from && entry.to === to)
  }

  sources() {
    return this.#flushed.map(({ from }) => from)
  }

  on(event, listener) {
    if (event === 'add') {
      this.#addlisteners.push(listener)
    } else if (event === 'remove') {
      this.#removelisteners.push(listener)
    }
  }

  #emitDiff() {
    const current = this.#paths.map(({ from }) => from)
    const flushed = this.#flushed.map(({ from }) => from)

    const added = current.filter(path => !flushed.includes(path))
    const removed = flushed.filter(path => !current.includes(path))

    added.forEach(path => this.#addlisteners.forEach(listener => listener(path)))
    removed.forEach(path => this.#removelisteners.forEach(listener => listener(path)))
  }

  async repeat(path) {
    await Promise.all(this.#flushed.map(async ({from, to}) => {
      if (from === path) {
        await this.#copy(from, to)
      }
    }))
  }

  async #copy(from, to) {
    try {
      const t = await time(() => copy(from, to))
      success('copied', from + ' -> ' + to, `(${t})`)
    } catch (err) {
      error('copy failed', from + ' -> ' + to, err)
    }
  }
}
