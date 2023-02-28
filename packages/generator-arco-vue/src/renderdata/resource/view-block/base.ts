/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, ViewType, View, Block, BlockRelationshipType } from '@dulladmin/core'
import { toCamelize, toI18nMessage, toPath } from '../../../naming'

export function renderData_Block(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block`

  const api = { url: '' }
  switch (view.type) {
    case ViewType.Index:
    case ViewType.New:
      api.url = `/${resourceName}/${viewName}/${blockName}`
      break
    case ViewType.Show:
    case ViewType.Edit:
    case ViewType.Delete:
      api.url = resource.singular
        ? `/${resourceName}/${viewName}/${blockName}`
        : `/${resourceName}/\${id}/${viewName}/${blockName}`
      break
  }

  return {
    componentName: `${toCamelize(block.relName)}Block`,
    componentImportPath: `@/views/modules/${resourceName}/${viewName}/components/${blockName}-block.vue`,
    api,
    apiImportPath: `@/api/modules/${resourceName}/${viewName}/${blockName}-block`,
    authority: block.inheritedAuthority,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(
        block.relType === BlockRelationshipType.Self ? resource.name : block.relName
      )} ${toI18nMessage(block.type)}`
    }
  }
}
