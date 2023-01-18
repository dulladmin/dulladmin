import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import fse from 'fs-extra'
import { globby } from 'globby'
import logger from '@/logger'
import { findGenerator } from '@/codegen'
import { parseResourceFile } from '@/parser'

export const build = {
  command: 'build',
  desc: 'Parse DULLADMIN_FILES and generate output in clientDir',
  handler: async (argv: any): Promise<void> => {
    const dulladminDir = path.resolve(argv.config.dulladminDir)
    const clientDir = path.resolve(argv.config.clientDir)
    logger.info('Parsing DULLADMIN_FILES in ' + chalk.green(dulladminDir))
    logger.info('  output to ' + chalk.green(clientDir))

    if (!(await fse.pathExists(dulladminDir))) {
      logger.error('The dulladminDir does not exists')
      process.exit(1)
    }

    if (!(await fse.pathExists(clientDir))) {
      logger.error('The clientDir does not exists')
      process.exit(1)
    }

    const pkgFile = path.resolve(clientDir, 'package.json')
    if (!(await fse.pathExists(pkgFile))) {
      logger.error('The clientDir is not valid')
      process.exit(1)
    }

    const templateName = 'arco-vue'
    const generator = findGenerator(templateName)
    const files = await globby('resources/*.yml', { cwd: dulladminDir })
    files.forEach((file) => {
      try {
        logger.info(chalk.green(file))
        const data = fs.readFileSync(path.resolve(dulladminDir, file), 'utf8')
        const resource = parseResourceFile(data)
        const files = generator.buildResource(resource)
        console.log(files)
      } catch (err) {
        logger.error((err as Error).message)
        process.exit(1)
      }
    })
  }
}
