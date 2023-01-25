import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import fse from 'fs-extra'
import { globby } from 'globby'
import { parseResourceFile } from '@dulladmin/core'
import type { Generator } from '@dulladmin/core'
import logger from '../logger'

export const build = {
  command: 'build',
  desc: 'Parse DULLADMIN_FILES and generate output in clientDir',
  handler: async (argv: any): Promise<void> => {
    const dulladminDir = argv.config.dulladminDir
    const clientGenerator: Generator = (await import(argv.config.clientGenerator)).default
    const clientDir = argv.config.clientDir
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

    const pkgFile = path.join(clientDir, 'package.json')
    if (!(await fse.pathExists(pkgFile))) {
      logger.error('The clientDir is not valid')
      process.exit(1)
    }

    const resourceFiles = await globby('resources/*.yml', { cwd: dulladminDir })
    resourceFiles.forEach((resourceFile) => {
      try {
        const resourceFilePath = path.join(dulladminDir, resourceFile)
        logger.info(`    - ${resourceFilePath}`)

        const data = fs.readFileSync(resourceFilePath, 'utf8')
        const resource = parseResourceFile(data)
        const generatedFiles = clientGenerator.buildResource(resource)
        generatedFiles.forEach(
          (generatedFile) =>
            (async () => {
              const generatedFilePath = path.join(clientDir, generatedFile.path)
              logger.info(`       + ${generatedFilePath}`)

              if (generatedFilePath.endsWith('.json') && (await fse.pathExists(generatedFilePath))) {
                const oldData = JSON.parse(fs.readFileSync(generatedFilePath, 'utf8'))
                const newData = JSON.parse(generatedFile.content)

                const r: Record<string, any> = {}
                Object.keys(newData).forEach((k) => {
                  // * use Object.keys to delete extraneous properties
                  // * use Object#hasOwnProperty to skip updating properties that exist
                  r[k] = Object.hasOwnProperty.call(oldData, k) ? oldData[k] : newData[k]
                })
                await fse.outputFile(generatedFilePath, JSON.stringify(r, null, 2) + '\n')
              } else {
                await fse.outputFile(generatedFilePath, generatedFile.content)
              }
            })() as unknown
        )
      } catch (err) {
        logger.error((err as Error).message)
        process.exit(1)
      }
    })
  }
}
