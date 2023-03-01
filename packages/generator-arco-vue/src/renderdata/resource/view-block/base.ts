/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, ViewType, View, Block, BlockRelationshipType } from '@dulladmin/core'
import { toCamelize, toI18nMessage, toPath } from '../../../naming'

export function renderData_Block(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block`
  const url = renderData_BlockApiEndpoint(resource, view, block)

  return {
    componentName: `${toCamelize(block.relName)}Block`,
    componentImportPath: `@/views/modules/${resourceName}/${viewName}/components/${blockName}-block.vue`,
    api: { url },
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

export function renderData_BlockApiEndpoint(resource: Resource, view: View, block: Block): string {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)

  switch (view.type) {
    case ViewType.Index:
    case ViewType.New:
      return `/${resourceName}/${viewName}/${blockName}`
    case ViewType.Show:
    case ViewType.Edit:
    case ViewType.Delete:
      return resource.singular
        ? `/${resourceName}/${viewName}/${blockName}`
        : `/${resourceName}/\${id}/${viewName}/${blockName}`
  }
}
