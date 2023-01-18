import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import fse from 'fs-extra'
import { globby } from 'globby'
import { parseResourceFile } from '@/parser'
import logger from '@/logger'

const build = {
  command: 'build',
  desc: 'Parse DULLADMIN_FILES and generate output in clientDir',
  handler: async (argv: any): Promise<void> => {
    const dulladminDir = path.resolve(process.cwd(), 'dulladmin')
    logger.info('Parsing DULLADMIN_FILES in ' + chalk.green(dulladminDir))

    if (!(await fse.pathExists(dulladminDir))) {
      logger.error('The given path does not exist')
      process.exit(1)
    }

    const files = await globby('resources/*.yml', { cwd: dulladminDir })
    files.forEach((file) => {
      try {
        logger.info('  ' + chalk.green(file))
        const data = fs.readFileSync(path.resolve(dulladminDir, file), 'utf8')
        parseResourceFile(data)
      } catch (err) {
        logger.error((err as Error).message)
        process.exit(1)
      }
    })
  }
}

export { build }
