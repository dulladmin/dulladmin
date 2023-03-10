import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import fse from 'fs-extra'
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
    if (!(await fse.pathExists(path.join(clientDir, 'package.json')))) {
      logger.error('The clientDir is not valid')
      process.exit(1)
    }

    const response = clientGenerator.build({ dulladminDir })
    if (response.code !== 0) {
      Object.entries(response.data.errors!).forEach(([infilePath, errorMessage]) => {
        logger.error(`    - ${infilePath}`)
        logger.error(`      + ${errorMessage}`)
      })
      process.exit(1)
    }

    const { files } = response.data
    Object.entries(files!).forEach(([infilePath, outfiles]) => {
      logger.info(`    - ${infilePath}`)

      outfiles.forEach(
        (outfile) =>
          (async () => {
            const outfilePath = path.join(clientDir, outfile.path)
            logger.info(`      + ${outfilePath}`)

            if (await fse.pathExists(outfilePath)) {
              // skip
              if (outfile.ignoreExisting ?? false) return

              // merge OR overwrite
              if (outfilePath.endsWith('.json')) {
                const oldData = (await fse.pathExists(outfilePath))
                  ? JSON.parse(fs.readFileSync(outfilePath, 'utf8'))
                  : {}
                const newData = JSON.parse(outfile.content)
                const r: Record<string, any> = {}
                Object.keys(newData).forEach((k) => {
                  // * use Object.keys to delete extraneous properties
                  // * use Object#hasOwnProperty to skip updating properties that exist
                  r[k] = Object.hasOwnProperty.call(oldData, k) ? oldData[k] : newData[k]
                })
                await fse.outputFile(outfilePath, JSON.stringify(r, null, 2) + '\n')
              } else {
                await fse.outputFile(outfilePath, outfile.content)
              }
            } else {
              // create
              await fse.outputFile(outfilePath, outfile.content)
            }
          })() as unknown
      )
    })
  }
}
