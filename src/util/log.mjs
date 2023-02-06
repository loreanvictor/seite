import chalk from 'chalk'


const THEME = {
  info: '#3E6D9C',
  success: '#59CE8F',
  name: '#FFEBB7',
  extra: '#5D3891',
  punc: '#84D2C5',
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
    `${chalk.hex(THEME.success)(' ✓ ' + prefix)} ${punc(msg)} `
    + (extra ? chalk.hex(THEME.extra)(extra) : '')
  )
}


export const name = msg => chalk.hex(THEME.name)(msg)
export const files = list => list[0] + (list.length > 1 ? ' (+' + (list.length - 1) + ' more)' : '')
