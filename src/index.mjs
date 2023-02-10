import parse from './args.mjs'
import { serve } from './serve.mjs'


const args = parse(process.argv, {
  flags: ['serve'],
  params: ['root'],
})

if (args.serve) {
  serve(args._[0], args._[1])
}
