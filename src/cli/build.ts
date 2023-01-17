import path from 'path'
import chalk from 'chalk'
import { fs, logger } from './utils'

const build = {
  command: 'build',
  desc: 'Parse DULLADMIN_FILES and generate output in clientDir',
  handler: async (argv: any): Promise<void> => {
    const dulladminDir = path.resolve(process.cwd(), 'dulladmin')
    logger.info('Parsing DULLADMIN_FILES in ' + chalk.green(dulladminDir))

    if (!(await fs.pathExists(dulladminDir))) {
      logger.error('The given path does not exist')
      process.exit(1)
    }
  }
}

export { build }
