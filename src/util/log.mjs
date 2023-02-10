import chalk from 'chalk'


const THEME = {
  info: '#9e9e9e',
  highlight: '#96BAFF',
  error: '#EB455F',
  success: '#00FFAB',
  name: '#FFEBB7',
  extra: '#424242',
  punc: '#1DB9C3',
}

const PAD_LENGTH = 24
const pad = (msg, length = 24, char = '.') =>
  msg.length < length ?
    msg + ' ' + chalk.hex(THEME.extra)(char.repeat(length - 1 - msg.length))
    : msg

const punc = msg => msg
  .replaceAll('•', chalk.hex(THEME.punc)('•'))
  .replaceAll('->', chalk.hex(THEME.punc)('->'))
  .replaceAll('::', chalk.hex(THEME.punc)('::'))


export const inform = (prefix, msg, extra) => {
  console.log(
    `${chalk.hex(THEME.info)(punc(' • ') + punc(msg ? pad(prefix) : prefix))} ${msg ? punc(msg) : ''} `
    + (extra ? chalk.hex(THEME.extra)(extra) : '')
  )
}


export const highlight = (prefix, msg, extra) => {
  console.log(
    `${chalk.hex(THEME.highlight)(' ⚡' + (msg ? pad(prefix) : prefix))} ${msg ? punc(msg) : ''} `
    + (extra ? chalk.hex(THEME.extra)(extra) : '')
  )
}

export const success = (prefix, msg, extra) => {
  console.log(
    `${chalk.bold.hex(THEME.success)(' ✓ ' + (msg ? pad(prefix) : prefix))} ${msg ? punc(msg) : ''} `
    + (extra ? chalk.hex(THEME.extra)(extra) : '')
  )
}


export const error = (prefix, msg, err) => {
  console.log(
    chalk.bold.hex(THEME.error)(` ✕ ${msg ? pad(prefix) : prefix} ${msg ? punc(msg) : ''}`)
    + (err ? chalk.hex(THEME.error)('\n | '.padEnd(PAD_LENGTH + 5) + (err.message ?? err)) : '')
  )
}


export const name = msg => chalk.bold.hex(THEME.name)(msg)
export const files = list => list[0] + (list.length > 1 ? ' (+' + (list.length - 1) + ' more)' : '')
