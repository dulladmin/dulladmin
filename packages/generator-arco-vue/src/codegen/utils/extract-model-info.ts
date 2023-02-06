import { Resource, View, Block } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../naming'
import { toJsonType } from './base'

export function extractModelInfo(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block.model.attributes`

  return {
    attributes: block.model.attributes.map((attr) => {
      return {
        name: attr.name,
        type: attr.type,
        jsonType: toJsonType(attr.type),
        optionals: attr.optionals?.map((rawOpt) => {
          const opt = String(rawOpt)
          return {
            name: opt,
            i18nKey: `${i18nKeyPrefix}.${attr.name}.optionals.${opt}`,
            i18nValue: toI18nMessage(opt)
          }
        }),
        collection: attr.collection,
        object:
          attr.object == null
            ? null
            : {
                attributes: attr.object.attributes.map((objAttr) => {
                  return {
                    name: objAttr.name,
                    type: objAttr.type,
                    jsonType: toJsonType(objAttr.type),
                    optionals: attr.optionals?.map((rawOpt) => {
                      const opt = String(rawOpt)
                      return {
                        name: opt,
                        i18nKey: `${i18nKeyPrefix}.${attr.name}.${objAttr.name}.optionals.${opt}`,
                        i18nValue: toI18nMessage(opt)
                      }
                    }),
                    collection: objAttr.collection,
                    i18nKey: `${i18nKeyPrefix}.${attr.name}.${objAttr.name}`,
                    i18nValue: toI18nMessage(objAttr.name)
                  }
                })
              },
        i18nKey: `${i18nKeyPrefix}.${attr.name}`,
        i18nValue: toI18nMessage(attr.name)
      }
    })
  }
}

export function enhanceModelInfoWithSorter(model: Record<string, any>, sorters: Record<string, any>): void {
  model.attributes.forEach((attr: Record<string, any>) => {
    const sorter = sorters.find((sorter: Record<string, any>) => sorter.name === attr.name)
    if (sorter != null) attr.sorter = { directions: sorter.directions }
  })
}
