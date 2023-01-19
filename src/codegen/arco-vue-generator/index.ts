import { Resource } from '@/parser'
import type { GeneratedFile, Generator } from '@/codegen/generator'
import { templateDir } from './files'
import genAPI from './gen-api'
import genRoutes from './gen-routes'
import genViews from './gen-views'

export default class ArcoVueGenerator implements Generator {
  get templateDir(): string {
    return templateDir
  }

  buildResource(resource: Resource): GeneratedFile[] {
    return ([] as GeneratedFile[]).concat(genAPI(resource)).concat(genRoutes(resource)).concat(genViews(resource))
  }
}
