import { Resource } from '@dulladmin/core'
import type { GeneratedFile, Generator } from '@dulladmin/core'
import { skeletalDir } from './files'
import { genAPI, genRoutes, genViews } from './codegen'

class GeneratorArcoVue implements Generator {
  get templateDir(): string {
    return skeletalDir
  }

  buildResource(resource: Resource): GeneratedFile[] {
    return ([] as GeneratedFile[]).concat(genAPI(resource)).concat(genRoutes(resource)).concat(genViews(resource))
  }
}

const generator = new GeneratorArcoVue()
export default generator
