import chalk from 'chalk'


const THEME = {
  info: '#9e9e9e',
  success: '#00FFAB',
  name: '#FFEBB7',
  extra: '#424242',
  punc: '#1DB9C3',
}


const punc = msg => msg
  .replaceAll('->', chalk.hex(THEME.punc)('->'))
  .replaceAll('::', chalk.hex(THEME.punc)('::'))


export const inform = (prefix, msg, extra) => {
  console.log(
    `${chalk.hex(THEME.info)(' * ' + prefix)} ${punc(msg)} `
    + (extra ? chalk.hex(THEME.extra)(extra) : '')
  )
}


export const success = (prefix, msg, extra) => {
  console.log(
    `${chalk.bold.hex(THEME.success)(' ✓ ' + prefix)} ${punc(msg)} `
    + (extra ? chalk.hex(THEME.extra)(extra) : '')
  )
}


export const name = msg => chalk.bold.hex(THEME.name)(msg)
export const files = list => list[0] + (list.length > 1 ? ' (+' + (list.length - 1) + ' more)' : '')
