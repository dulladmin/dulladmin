import child_process from 'node:child_process'
import path from 'node:path'
import util from 'node:util'
import chalk from 'chalk'
import fse from 'fs-extra'
import type { Generator } from '@dulladmin/core'
import logger from '../logger'

export const clientUpdate = {
  command: 'client:update',
  desc: 'Update the skeletal to latest version',
  handler: async (argv: any): Promise<void> => {
    const clientGenerator: Generator = (await import(argv.config.clientGenerator)).default
    const clientDir = argv.config.clientDir
    logger.info('Updating the client at ' + chalk.green(clientDir))

    const pkgFile = path.join(clientDir, 'package.json')
    if (!(await fse.pathExists(pkgFile))) {
      logger.error('The clientDir is not valid')
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
