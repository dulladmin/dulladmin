import path from 'node:path'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url) // eslint-disable-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename) // eslint-disable-line @typescript-eslint/naming-convention

export const skeletalDir = path.resolve(__dirname, 'skeletal')
export const generatorsDir = path.resolve(__dirname, 'generators')
