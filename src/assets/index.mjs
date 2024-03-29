import { Manager } from './manager.mjs'
import watch from './watcher.mjs'


export default class WatchableManager extends Manager {
  #watcher

  constructor (options) {
    super(options)
  }

  watch() {
    this.#watcher ??= watch(this)
  }

  close () {
    this.#watcher?.close()
  }
}
