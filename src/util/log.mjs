import chalk from 'chalk'


const THEME = {
  info: '#3E6D9C',
  success: '#59CE8F',
  name: '#FFEBB7',
}


export const inform = (prefix, msg) => {
  console.log(`${chalk.hex(THEME.info)(' * ' + prefix)} ${msg}`)
}


export const success = (prefix, msg) => {
  console.log(`${chalk.hex(THEME.success)(' ✓ ' + prefix)} ${msg}`)
}


export const name = msg => chalk.hex(THEME.name)(msg)
