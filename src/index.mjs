#!/usr/bin/env node

import parse from './args.mjs'
import { serve } from './serve.mjs'
import { error } from './util/log.mjs'


const args = parse(process.argv, {
  flags: ['serve'],
  params: ['root'],
})

const target = args._[0] ?? 'README.md'
const dest = args._[1] ?? 'dist/index.html'

if (args.serve) {
  serve(target, dest)
    .catch(err => error('FATAL', 'serving failed', err))
}
