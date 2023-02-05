import { TableBlockSearcher } from '@dulladmin/core'
import { toJsonType } from './base'

export function enhanceModelInfoWithTableSearcher(model: Record<string, any>, searchers: TableBlockSearcher[]): void {
  model.searchers = searchers.map((searcher) => {
    let type = null
    let optionals = null
    if (searcher.type != null) {
      type = searcher.type
      optionals = searcher.optionals
    } else {
      const attr = model.attributes.find((attr: Record<string, any>) => attr.name === searcher.name)
      type = attr.type
      optionals = attr.optionals
    }

    return {
      name: searcher.name,
      predicate: searcher.predicate,
      type,
      jsonType: toJsonType(type),
      optionals
    }
  })
}
