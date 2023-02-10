
import glob from 'glob'
import { extname, dirname, join, relative, basename } from 'path'


export class Manager {
  #sources = []
  #target = ''
  #dest = ''
  #destDir = ''
  #exclude = []
  #root = ''
  #ready

  #addListeners = []
  #removeListeners = []
  #updateListeners = []
  #changeListeners = []

  constructor(target = 'README.md', dest = 'dist/index.html') {
    this.#target = target
    this.#dest = extname(dest) ? dest : ''
    this.#destDir = extname(dest) ? dirname(dest) : dest

    if (!extname(target)) {
      if (target.endsWith('*') && !target.endsWith('**')) {
        this.#target += '.@(md|html)'
      } else {
        this.#target = join(this.#target, '*.@(md|html)')
      }
    }

    this.#exclude = [
      '**/node_modules/**',
      this.#destDir + '/**',
      '**/_*',
    ]

    const steps = target.split('/')
    for (const step of steps) {
      if (glob.hasMagic(step) || extname(step)) {
        break
      } else {
        this.#root = join(this.#root, step)
      }
    }

    let resolve, reject
    this.#ready = new Promise((r, j) => (resolve = r, reject = j))

    glob(this.#target, { ignore: this.#exclude }, (_, files) => {
      if (files.length === 0) {
        reject(new Error('No source files found.'))
      } else if (files.length > 1 && this.#dest) {
        reject(new Error('Multiple source files found, but destination is single file.'))
      }

      this.#sources = files
      resolve()
    })
  }

  ready() {
    return this.#ready
  }

  sources() {
    return this.#sources
  }

  exclude() {
    return this.#exclude
  }

  dest(target) {
    if (this.#dest) {
      return this.#dest
    } else {
      const base = join(this.#destDir, relative(this.#root, target))

      return join(dirname(base), basename(base, extname(base)) + '.html')
    }
  }

  add(source) {
    this.#sources.push(source)
    this.#addListeners.forEach(listener => listener(source))
    this.#changeListeners.forEach(listener => listener(source))
  }

  remove(source) {
    this.#sources = this.#sources.filter(s => s !== source)
    this.#removeListeners.forEach(listener => listener(source))
  }

  update(source) {
    this.#updateListeners.forEach(listener => listener(source))
    this.#changeListeners.forEach(listener => listener(source))
  }

  on(event, listener) {
    event === 'add' && this.#addListeners.push(listener)
    event === 'remove' && this.#removeListeners.push(listener)
    event === 'update' && this.#updateListeners.push(listener)
    event === 'change' && this.#changeListeners.push(listener)
  }
}
