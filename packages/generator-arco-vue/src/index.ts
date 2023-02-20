import fs from 'node:fs'
import path from 'node:path'
import fse from 'fs-extra'
import { globbySync } from 'globby'
import { parseAppFile, parseResourceFile, Resource } from '@dulladmin/core'
import type {
  GeneratedFile,
  ClientInstallRequest,
  ClientInstallResponse,
  ClientUpdateRequest,
  ClientUpdateResponse,
  BuildRequest,
  BuildResponse,
  Generator
} from '@dulladmin/core'
import { skeletalDir } from './files'
import { genAppMenu, genAppSite, genAPI, genI18n, genRoutes, genViews } from './codegen'

class GeneratorArcoVue implements Generator {
  clientInstall(_: ClientInstallRequest): ClientInstallResponse {
    return {
      code: 0,
      msg: 'ok',
      data: {
        templateDir: skeletalDir,
        postinstallScript: 'bin/setup'
      }
    }
  }

  clientUpdate(_: ClientUpdateRequest): ClientUpdateResponse {
    return {
      code: 0,
      msg: 'ok',
      data: {
        templateDir: skeletalDir,
        ignore: ['src/router/app-menu/routes.ts', 'components.d.ts'],
        postupdateScript: 'bin/setup'
      }
    }
  }

  build(req: BuildRequest): BuildResponse {
    const { dulladminDir } = req
    const files: Record<string, GeneratedFile[]> = {}
    const errors: Record<string, string> = {}

    const resources: Resource[] = []
    const resourceFiles = globbySync('resources/*.yml', { cwd: dulladminDir })
    resourceFiles.forEach((resourceFile) => {
      const resourceFilePath = path.join(dulladminDir, resourceFile)
      try {
        const resourceFileContent = fs.readFileSync(resourceFilePath, 'utf8')
        const resource = parseResourceFile(resourceFileContent)
        resources.push(resource)
        files[resourceFilePath] = ([] as GeneratedFile[])
          .concat(genAPI(resource))
          .concat(genRoutes(resource))
          .concat(genViews(resource))
          .concat(genI18n(resource))
      } catch (err) {
        errors[resourceFilePath] = (err as Error).message
      }
    })

    const appFilePath = path.join(dulladminDir, 'app.yml')
    if (fse.pathExistsSync(appFilePath)) {
      try {
        const appFileContent = fs.readFileSync(appFilePath, 'utf8')
        const app = parseAppFile(appFileContent)
        files[appFilePath] = ([] as GeneratedFile[]).concat(genAppMenu(app.menu, resources)).concat(genAppSite())
      } catch (err) {
        errors[appFilePath] = (err as Error).message
      }
    }

    if (Object.keys(errors).length !== 0) {
      return {
        code: 1,
        msg: 'failed',
        data: { errors }
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
