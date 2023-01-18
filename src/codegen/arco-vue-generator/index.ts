import { Resource } from '@/parser'
import { templateDir } from './files'
import type { GeneratedFile, Generator } from '@/codegen/generator'

export default class ArcoVueGenerator implements Generator {
  get templateDir(): string {
    return templateDir
  }

  buildResource(resource: Resource): GeneratedFile[] {
    return []
  }
}
