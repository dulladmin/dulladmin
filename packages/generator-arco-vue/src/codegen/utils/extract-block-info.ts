import { Resource, View, Block, BlockRelationshipType } from '@dulladmin/core'
import { toCamelize, toI18nMessage, toPath } from '../../naming'

export function extractBlockInfo(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block`

  return {
    componentName: `${toCamelize(block.relName)}Block`,
    componentImportPath: `@/views/modules/${resourceName}/${viewName}/components/${blockName}-block.vue`,
    apiImportPath: `@/api/modules/${resourceName}/${viewName}/${blockName}`,
    authority: block.authority ?? view.authority ?? resource.authority,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(
        block.relType === BlockRelationshipType.Self ? resource.name : block.relName
      )} ${toI18nMessage(block.type)}`
    }
  }
}
