/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, ViewPathScope, View, Block, BlockType } from '@dulladmin/core'
import { toCamelize, toUnderscore, toI18nMessage, toPath } from '../../../naming'
import { isResourceAction, isSelfBlock } from '../../base'

export function renderData_Block(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)
  const xpath = `${resourcePath}--${viewPath}.${blockPath}-block`
  const url = renderData_BlockApiEndpoint(resource, view, block)

  const resourceName = toUnderscore(resource.name)
  const viewName = toUnderscore(view.name)
  const blockName = toUnderscore(block.name)

  let title = ''
  if (isSelfBlock(block)) {
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
    __name: block.name,
    componentName: `${toCamelize(blockName)}Block`,
    componentNamePath: `dac-${blockPath}-block`,
    componentImportPath: `@/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    api: { url },
    apiImportPath: `@/api/modules/${resourcePath}/${viewPath}/${blockPath}-block`,
    authority: block.inheritedAuthority,
    title: {
      i18nKey: `${xpath}.title`,
      i18nValue: title
    }
  }
}

export function renderData_BlockApiEndpoint(resource: Resource, view: View, block: Block): string {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)

  return resource.singular || view.pathScope === ViewPathScope.Collection
    ? `/${resourcePath}/${viewPath}/${blockPath}`
    : `/${resourcePath}/\${id}/${viewPath}/${blockPath}`
}
