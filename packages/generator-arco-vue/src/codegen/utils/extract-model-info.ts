import { Resource, View, Block } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../naming'
import { toJsonType } from './base'

export function extractModelInfo(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block.model`

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
            i18nKey: `${i18nKeyPrefix}.attributes.${attr.name}.optionals.${opt}`,
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
                    optionals: attr.optionals?.map((rawObjOpt) => {
                      const objOpt = String(rawObjOpt)
                      return {
                        name: objOpt,
                        i18nKey: `${i18nKeyPrefix}.attributes.${attr.name}.${objAttr.name}.optionals.${objOpt}`,
                        i18nValue: toI18nMessage(objOpt)
                      }
                    }),
                    collection: objAttr.collection,
                    i18nKey: `${i18nKeyPrefix}.attributes.${attr.name}.${objAttr.name}`,
                    i18nValue: toI18nMessage(objAttr.name)
                  }
                })
              },
        i18nKey: `${i18nKeyPrefix}.attributes.${attr.name}`,
        i18nValue: toI18nMessage(attr.name)
      }
    })
  }
}
