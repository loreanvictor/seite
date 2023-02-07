import { Manager } from './manager.mjs'
import watch from './watcher.mjs'


export default class WatchableManager extends Manager {
  #watcher

  constructor (...args) {
    super(...args)
  }

  watch() {
    this.#watcher ??= watch(this)
  }

  close () {
    this.#watcher?.close()
  }
}



