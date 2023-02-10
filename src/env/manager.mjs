import { access } from 'fs/promises'
import { join, sep, dirname, relative } from 'path'


export const TARGETS = {
  '_seite.css': 'ASSET',
}


export class Manager {
  #root
  #graph = {}
  #listeners = []
  #exclude = []

  constructor(inputs, root = process.cwd()) {
    this.#root = root
    this.#exclude = inputs.exclude()
  }

  exclude() {
    return this.#exclude
  }

  root() {
    return this.#root
  }

  async scan(target) {
    const bag = []
    const dir = this.#dir(target)
    const steps = ('./' + dir).split(sep)
    let path = '.'
    for (const step of steps) {
      path = join(path, step)
      await this.#collect(join(path, '_seite.css'), bag)
      await this.#collect(join(path, '_seite.js'), bag)
    }

    this.#graph[dir] = bag
  }

  async get(target) {
    const dir = this.#dir(target)
    if (!this.#graph[dir]) {
      await this.scan(target)
    }

    return this.#graph[dir].map(d => relative(dir, d))
  }

  add(dep) {
    const dir = this.#dir(dep)
    const rel = this.#rel(dep)
    if (!this.#graph[dir]) {
      this.#graph[dir] = []
    }

    let notif = false
    Object.keys(this.#graph).forEach(_dir => {
      if (this.#affects(_dir, dir)) {
        this.#graph[_dir].push(rel)
        notif = true
      }
    })

    notif && this.notify(rel)
  }

  remove(dep) {
    const dir = this.#dir(dep)
    const rel = this.#rel(dep)

    let notif = false
    Object.keys(this.#graph).forEach(_dir => {
      if (this.#affects(_dir, dir)) {
        this.#graph[_dir] = this.#graph[_dir].filter(d => d !== rel)
        notif = true
      }
    })

    notif && this.notify(rel)
  }

  on(event, listener) {
    if (event === 'change') {
      this.#listeners.push(listener)
    }
  }

  notify(dep) {
    const dir = this.#dir(dep)
    this.#listeners.forEach(listener => listener({
      path: dep,
      affects: path => this.#affects(this.#dir(path), dir),
    }))
  }

  async #collect(path, bag) {
    try {
      await access(path)
      bag.push(path)
    } catch { /* ignore */ }
  }

  #dir(path) {
    return relative(this.#root, dirname(path))
  }

  #rel(path) {
    return relative(this.#root, path)
  }

  #affects(dir, depDir) {
    return depDir === dir || relative(dir, depDir).split(sep).every(step => step === '..')
  }
}
