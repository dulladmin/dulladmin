/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, ViewPathScope, View, Block, BlockType, BlockRelationshipType } from '@dulladmin/core'
import { toCamelize, toUnderscore, toI18nMessage, toPath } from '../../../naming'
import { isResourceAction } from '../../base'

export function renderData_Block(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const i18nKeyPrefix = `${resourcePath}--${viewPath}.${blockPath}-block`
  const url = renderData_BlockApiEndpoint(resource, view, block)

  const resourceName = toUnderscore(resource.name)
  const viewName = toUnderscore(view.name)
  const blockName = toUnderscore(block.relName)

  let title = ''
  if (block.relType === BlockRelationshipType.Self) {
    title = isResourceAction(view.name) ? toI18nMessage(resourceName) : toI18nMessage(viewName)
  } else {
    title = toI18nMessage(blockName)
  }
  if (block.type === BlockType.EChartsBlock) {
    title = title + ' Chart'
  } else {
    title = title + ' ' + toI18nMessage(block.type)
  }

  return {
    componentName: `${toCamelize(blockName)}Block`,
    componentImportPath: `@/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    api: { url },
    apiImportPath: `@/api/modules/${resourcePath}/${viewPath}/${blockPath}-block`,
    authority: block.inheritedAuthority,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: title
    }
  }
}

export function renderData_BlockApiEndpoint(resource: Resource, view: View, block: Block): string {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)

  return resource.singular || view.pathScope === ViewPathScope.Collection
    ? `/${resourcePath}/${viewPath}/${blockPath}`
    : `/${resourcePath}/\${id}/${viewPath}/${blockPath}`
}
