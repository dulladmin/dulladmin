import ArcoVueGenerator from './arco-vue-generator'
import type { Generator } from './generator'

export function findGenerator(templateName: string): Generator {
  switch (templateName) {
    case 'arco-vue':
      return new ArcoVueGenerator()
    default:
      throw new Error('templateName must be one of ["arco-vue"]')
  }
}
