import {
  Resource,
  ViewType,
  View,
  BlockRelationshipType,
  Block,
  ScalarValueType,
  ObjectValueType
} from '@dulladmin/core'
import { toCamelize, toI18nMessage, toPath } from '../naming'

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

export function extractApiInfo(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)

  const importPath = `@/api/modules/${resourceName}/${viewName}/${blockName}`
  let url = ''

  switch (view.type) {
    case ViewType.Index:
    case ViewType.New:
      url = `/${resourceName}/${viewName}/${blockName}`
      break
    case ViewType.Show:
    case ViewType.Edit:
      url = resource.singular
        ? `/${resourceName}/${viewName}/${blockName}`
        : `/${resourceName}/\${id}/${viewName}/${blockName}`
      break
  }

  return { importPath, url }
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

export function extractBlockInfo(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block`

  const importPath = `@/views/modules/${resourceName}/${viewName}/components/${blockName}-block.vue`
  const componentName = `${toCamelize(block.relName)}Block`

  return {
    importPath,
    componentName,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(
        block.relType === BlockRelationshipType.Self ? resource.name : block.relName
      )} ${toI18nMessage(block.type)}`
    }
  }
}

export function extractRouteInfo(resource: Resource, view: View): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)

  const viewImportPath = `@/views/modules/${resourceName}/${viewName}/index.vue`
  const name = `${resourceName}--${viewName}`
  let path = ''

  switch (view.type) {
    case ViewType.Index:
      if (resource.singular) throw Error('Unreachable')
      path = `${resourceName}`
      break
    case ViewType.Show:
      path = resource.singular ? `${resourceName}` : `${resourceName}/:id`
      break
    case ViewType.New:
      path = resource.singular ? `${resourceName}/new` : `${resourceName}/:id/new`
      break
    case ViewType.Edit:
      path = resource.singular ? `${resourceName}/edit` : `${resourceName}/:id/edit`
      break
  }

  return { name, path, viewImportPath }
}
