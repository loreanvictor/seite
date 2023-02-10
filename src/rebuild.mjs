import { build } from './build/index.mjs'
import { inform, name } from './util/log.mjs'
import AssetsManager from './assets/index.mjs'
import EnvManager from './env/index.mjs'
import InputsManager from './input/index.mjs'


export const rebuild = async (target, dest) => {
  const inputs = new InputsManager(target, dest)
  const env = new EnvManager(inputs)
  const assets = new AssetsManager()

  await inputs.ready()

  await build(inputs, assets, env)

  inputs.watch()
  assets.watch()
  env.watch()

  inputs.on('change', source => build(inputs, assets, env, [source]))

  env.on('change', change => {
    inform('change', name(change.path))
    build(inputs, assets, env, inputs.sources().filter(source => change.affects(source)))
  })

  return () => {
    inputs.close()
    assets.close()
    env.close()
  }
}
