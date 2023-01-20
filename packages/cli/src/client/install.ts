import child_process from 'node:child_process'
import util from 'node:util'
import chalk from 'chalk'
import fse from 'fs-extra'
import type { Generator } from '@dulladmin/core'
import logger from '../logger'

export const clientInstall = {
  command: 'client:install',
  desc: 'Generate a skeletal installation in clientDir',
  handler: async (argv: any): Promise<void> => {
    const clientGenerator: Generator = (await import(argv.config.clientGenerator)).default
    const clientDir = argv.config.clientDir
    logger.info('Installing the client at ' + chalk.green(clientDir))

    if (await fse.pathExists(clientDir)) {
      logger.error('The clientDir is already exists')
      process.exit(1)
    }

    try {
      logger.info('[1/2] Copying template content...')
      await fse.ensureDir(clientDir)
      await fse.copy(clientGenerator.templateDir, clientDir)
    } catch (err) {
      logger.error((err as Error).message)
      process.exit(1)
    }

    try {
      logger.info('[2/2] Setting up project dependency...')
      await util.promisify(child_process.spawn)('bin/setup', [], { cwd: clientDir, stdio: 'inherit' })
    } catch (err) {
      logger.error((err as Error).message)
      process.exit(1)
    }
  }
}
