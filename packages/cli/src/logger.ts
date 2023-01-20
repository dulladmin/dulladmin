import chalk from 'chalk'

const info = (message: string): void => {
  console.log(chalk.blue(' [INFO] ') + message)
}

const warn = (message: string): void => {
  console.log(chalk.yellow(' [WARN] ') + message)
}

const error = (message: string): void => {
  console.log(chalk.red('[ERROR] ') + message)
}

export default {
  info,
  warn,
  error
}
