import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fse from 'fs-extra'

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)
const copy = fse.copy
const ensureDir = fse.ensureDir
const pathExists = fse.pathExists

export default {
  _filename,
  _dirname,
  copy,
  ensureDir,
  pathExists
}
