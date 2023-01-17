import child_process from 'child_process'
import path from 'path'
import util from 'util'
import chalk from 'chalk'
import { fs, logger } from './utils'

const install = {
  command: 'client:install',
  desc: 'Generate a skeletal installation in clientDir',
  handler: async (argv: any): Promise<void> => {
    const clientDir = path.resolve(argv.config.clientDir)
    logger.info('Installing the client at ' + chalk.green(clientDir))

    if (await fs.pathExists(clientDir)) {
      logger.error('The given path already exists')
      process.exit(1)
    }

    try {
      logger.info('[1/2] Copying template content...')
      const templateName = 'arco-vue'
      const templateDir = path.resolve(fs._dirname, 'templates/' + templateName)
      await fs.ensureDir(clientDir)
      await fs.copy(templateDir, clientDir)
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

const update = {
  command: 'client:update',
  desc: 'Update the skeletal to latest version',
  handler: async (argv: any): Promise<void> => {
    const clientDir = path.resolve(argv.config.clientDir)
    logger.info('Updating the client at ' + chalk.green(clientDir))

    const pkgFile = path.resolve(clientDir, 'package.json')
    if (!(await fs.pathExists(pkgFile))) {
      logger.error('The given path is not valid')
      process.exit(1)
    }

    try {
      logger.info('[1/2] Copying template content...')
      const templateName = 'arco-vue'
      const templateDir = path.resolve(fs._dirname, 'templates/' + templateName)
      await fs.ensureDir(clientDir)
      await fs.copy(templateDir, clientDir)
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

export { install, update }
