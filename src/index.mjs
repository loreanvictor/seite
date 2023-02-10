import parse from './args.mjs'
import { serve } from './serve.mjs'
import { error } from './util/log.mjs'


const args = parse(process.argv, {
  flags: ['serve'],
  params: ['root'],
})

if (args.serve) {
  serve(args._[0], args._[1])
    .catch(err => error('FATAL', 'serving failed', err))
}
