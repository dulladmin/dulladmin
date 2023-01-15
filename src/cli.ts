import yargs from 'yargs'

export async function run(): Promise<void> {
  await yargs(process.argv.slice(2)).demandCommand().help().argv
}
