import { Resource, ViewType, View, Block, ScalarValueType, ObjectValueType } from '@dulladmin/core'
import { toCamelizeName, toPath } from '../naming'

const TYPES = {
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

export function extraceApiInfo(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)

  const importPath = `@/api/modules/${resourceName}/${viewName}/${blockName}`
  let url = `/${resourceName}/${viewName}/${blockName}`

  switch (view.type) {
    case ViewType.Index:
    case ViewType.New:
      break
    case ViewType.Show:
    case ViewType.Edit:
      if (!resource.singular) {
        url = `/${resourceName}/\${id}/${viewName}/${blockName}`
      }
      break
  }

  return { importPath, url }
}

export function extractModelInfo(_resource: Resource, _view: View, block: Block): Record<string, any> {
  const model = block.model

  return {
    attributes: model.attributes.map((attr) => {
      return {
        camelizeName: toCamelizeName(attr.name),
        name: attr.name,
        type: TYPES[attr.type],
        collection: attr.collection,
        object:
          attr.object == null
            ? null
            : {
                attributes: attr.object.attributes.map((objAttr) => {
                  return {
                    camelizeName: toCamelizeName(objAttr.name),
                    name: objAttr.name,
                    type: TYPES[objAttr.type],
                    collection: objAttr.collection
                  }
                })
              }
      }
    })
  }
}
