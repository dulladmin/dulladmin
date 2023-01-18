import path from 'node:path'
import url from 'node:url'

export const __filename = url.fileURLToPath(import.meta.url) // eslint-disable-line @typescript-eslint/naming-convention
export const __dirname = path.dirname(__filename) // eslint-disable-line @typescript-eslint/naming-convention
