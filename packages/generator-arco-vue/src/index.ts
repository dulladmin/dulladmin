import fs from 'node:fs'
import path from 'node:path'
import { globbySync } from 'globby'
import { parseResourceFile } from '@dulladmin/core'
import type { GeneratedFile, BuildInfo, Generator } from '@dulladmin/core'
import { skeletalDir } from './files'
import { genAPI, genI18n, genRoutes, genViews } from './codegen'

class GeneratorArcoVue implements Generator {
  get templateDir(): string {
    return skeletalDir
  }

  build(dulladminDir: string): BuildInfo {
    const files: Record<string, GeneratedFile[]> = {}

    const resourceFiles = globbySync('resources/*.yml', { cwd: dulladminDir })
    for (let i = 0; i < resourceFiles.length; i++) {
      try {
        const resourceFile = resourceFiles[i]
        const resourceFilePath = path.join(dulladminDir, resourceFile)
        const resourceFileContent = fs.readFileSync(resourceFilePath, 'utf8')
        const resource = parseResourceFile(resourceFileContent)
        files[resourceFilePath] = ([] as GeneratedFile[])
          .concat(genAPI(resource))
          .concat(genRoutes(resource))
          .concat(genViews(resource))
          .concat(genI18n(resource))
      } catch (err) {
        return {
          code: 1,
          msg: (err as Error).message
        }
      }
    }

    return {
      code: 0,
      msg: 'ok',
      data: { files }
    }
  }
}

const generator = new GeneratorArcoVue()
export default generator
