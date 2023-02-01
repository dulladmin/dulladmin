import { Resource, View, Block, ScalarValueType, ObjectValueType } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../naming'

const JSON_TYPES = {
  [ScalarValueType.Double]: 'number',
  [ScalarValueType.Float]: 'number',
  [ScalarValueType.Int32]: 'number',
  [ScalarValueType.Int64]: 'number',
  [ScalarValueType.Uint32]: 'number',
  [ScalarValueType.Uint64]: 'number',
  [ScalarValueType.Sint32]: 'number',
  [ScalarValueType.Sint64]: 'number',
  [ScalarValueType.Fixed32]: 'number',
  [ScalarValueType.Fixed64]: 'number',
  [ScalarValueType.Sfixed32]: 'number',
  [ScalarValueType.Sfixed64]: 'number',
  [ScalarValueType.Bool]: 'boolean',
  [ScalarValueType.String]: 'string',
  [ScalarValueType.Datetime]: 'string',
  [ObjectValueType.Object]: 'object'
}

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
        jsonType: JSON_TYPES[attr.type],
        collection: attr.collection,
        object:
          attr.object == null
            ? null
            : {
                attributes: attr.object.attributes.map((objAttr) => {
                  return {
                    name: objAttr.name,
                    type: objAttr.type,
                    jsonType: JSON_TYPES[objAttr.type],
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
