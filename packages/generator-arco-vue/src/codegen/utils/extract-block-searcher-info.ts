import { Resource, View, TableBlock } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../naming'
import { toJsonType } from './base'

export function extractBlockSearcherInfo(resource: Resource, view: View, block: TableBlock): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block.searchers`

  return block.searchers.map((searcher) => {
    const id = `${searcher.name}_${searcher.predicate}`

    let type = null
    let optionals = null
    if (searcher.type != null) {
      type = searcher.type
      optionals = searcher.optionals
    } else {
      const attr = block.model.attributes.find((attr) => attr.name === searcher.name)!
      type = attr.type
      optionals = attr.optionals
    }

    return {
      id,
      name: searcher.name,
      predicate: searcher.predicate,
      type,
      jsonType: toJsonType(type),
      optionals: optionals?.map((rawOpt) => {
        const opt = String(rawOpt)
        return {
          name: opt,
          i18nKey: `${i18nKeyPrefix}.${id}.optionals.${opt}`,
          i18nValue: toI18nMessage(opt)
        }
      }),
      i18nKey: `${i18nKeyPrefix}.${id}`,
      i18nValue: toI18nMessage(`${searcher.name} ${searcher.predicate}`)
    }
  })
}
