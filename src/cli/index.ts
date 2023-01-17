import { cosmiconfig } from 'cosmiconfig'
import merge from 'lodash.merge'
import yargs from 'yargs'
import { build } from './build'
import { install as clientInstall, update as clientUpdate } from './client'

export async function run(): Promise<void> {
  await yargs(process.argv.slice(2))
    .scriptName('dulladmin')
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'Use this configuration, overriding .dulladminrc.* config options if present'
    })
    .middleware(async (argv) => {
      const explorer = cosmiconfig('dulladmin')
      const result = argv.config != null ? await explorer.load(argv.config) : await explorer.search()
      argv.config = merge(result?.config ?? {}, {
        clientDir: './client'
      })
    })
    .command(build)
    .command(clientInstall)
    .command(clientUpdate)
    .demandCommand()
    .wrap(null).argv
}
