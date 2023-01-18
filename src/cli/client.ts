import child_process from 'node:child_process'
import path from 'node:path'
import util from 'node:util'
import chalk from 'chalk'
import fse from 'fs-extra'
import logger from '@/logger'
import { findGenerator } from '@/codegen'

export const install = {
  command: 'client:install',
  desc: 'Generate a skeletal installation in clientDir',
  handler: async (argv: any): Promise<void> => {
    const clientDir = path.resolve(argv.config.clientDir)
    logger.info('Installing the client at ' + chalk.green(clientDir))

    if (await fse.pathExists(clientDir)) {
      logger.error('The clientDir is already exists')
      process.exit(1)
    }

    try {
      logger.info('[1/2] Copying template content...')
      const templateName = 'arco-vue'
      const generator = findGenerator(templateName)
      await fse.ensureDir(clientDir)
      await fse.copy(generator.templateDir, clientDir)
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

export const update = {
  command: 'client:update',
  desc: 'Update the skeletal to latest version',
  handler: async (argv: any): Promise<void> => {
    const clientDir = path.resolve(argv.config.clientDir)
    logger.info('Updating the client at ' + chalk.green(clientDir))

    const pkgFile = path.resolve(clientDir, 'package.json')
    if (!(await fse.pathExists(pkgFile))) {
      logger.error('The clientDir is not valid')
      process.exit(1)
    }

    try {
      logger.info('[1/2] Copying template content...')
      const templateName = 'arco-vue'
      const generator = findGenerator(templateName)
      await fse.ensureDir(clientDir)
      await fse.copy(generator.templateDir, clientDir)
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
