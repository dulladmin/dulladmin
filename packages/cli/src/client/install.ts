import child_process from 'node:child_process'
import path from 'node:path'
import util from 'node:util'
import chalk from 'chalk'
import fse from 'fs-extra'
import type { Generator } from '@dulladmin/core'
import logger from '../logger'

export const clientInstall = {
  command: 'client:install',
  desc: 'Generate a skeletal installation in clientDir',
  handler: async (argv: any): Promise<void> => {
    const dulladminDir = argv.config.dulladminDir
    if (!(await fse.pathExists(dulladminDir))) {
      await fse.ensureDir(dulladminDir)
      await fse.ensureDir(path.join(dulladminDir, 'resources'))
      await fse.ensureFile(path.join(dulladminDir, 'app.yml'))
    }

    const clientGenerator: Generator = (await import(argv.config.clientGenerator)).default
    const clientDir = argv.config.clientDir
    logger.info('Installing the client at ' + chalk.green(clientDir))
    if (await fse.pathExists(clientDir)) {
      logger.error('The clientDir is already exists')
      process.exit(1)
    }

    const response = clientGenerator.clientInstall({ dulladminDir })
    if (response.code !== 0) {
      logger.error(response.msg)
      process.exit(1)
    }

    const { templateDir, postinstallScript } = response.data
    try {
      logger.info('[1/2] Copying template content...')
      await fse.ensureDir(clientDir)
      await fse.copy(templateDir, clientDir)

      logger.info('[2/2] Setting up project dependency...')
      await util.promisify(child_process.spawn)(postinstallScript, [], { cwd: clientDir, stdio: 'inherit' })
    } catch (err) {
      logger.error((err as Error).message)
      process.exit(1)
    }
  }
}
