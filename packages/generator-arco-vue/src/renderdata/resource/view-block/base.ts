/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, ViewPathScope, View, Block, BlockRelationshipType } from '@dulladmin/core'
import { toCamelize, toI18nMessage, toPath } from '../../../naming'

export function renderData_Block(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const i18nKeyPrefix = `${resourcePath}--${viewPath}.${blockPath}-block`
  const url = renderData_BlockApiEndpoint(resource, view, block)

  let resourceTitle = ''
  if (block.relType === BlockRelationshipType.Self) {
    const isResourceView = ['index', 'new', 'show', 'edit', 'delete'].includes(view.name)
    resourceTitle = isResourceView ? resource.name : view.name
  } else {
    resourceTitle = block.relName
  }

  return {
    componentName: `${toCamelize(block.relName)}Block`,
    componentImportPath: `@/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    api: { url },
    apiImportPath: `@/api/modules/${resourcePath}/${viewPath}/${blockPath}-block`,
    authority: block.inheritedAuthority,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(resourceTitle)} ${toI18nMessage(block.type)}`
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
