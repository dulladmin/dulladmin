import { Resource } from '@dulladmin/core'
import type { GeneratedFile, Generator } from '@dulladmin/core'
import { skeletalDir } from './files'
import { genAPI, genI18n, genRoutes, genViews } from './codegen'

class GeneratorArcoVue implements Generator {
  get templateDir(): string {
    return skeletalDir
  }

  buildResource(resource: Resource): GeneratedFile[] {
    return ([] as GeneratedFile[])
      .concat(genAPI(resource))
      .concat(genRoutes(resource))
      .concat(genViews(resource))
      .concat(genI18n(resource))
  }
}

const generator = new GeneratorArcoVue()
export default generator
