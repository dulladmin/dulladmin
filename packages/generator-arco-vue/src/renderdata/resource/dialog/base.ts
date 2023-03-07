/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, Block, DialogPathScope, Dialog } from '@dulladmin/core'
import { toCamelize, toUnderscore, toI18nMessage, toPath } from '../../../naming'
import { renderData_BlockApiEndpoint } from '../view-block/base'

export function renderData_Dialog(resource: Resource, view: View, block: Block, dialog: Dialog): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const dialogPath = toPath(dialog.name)
  const xpath = `${resourcePath}--${viewPath}.${blockPath}-block.${dialogPath}-dialog`

  const blockName = toUnderscore(block.relName)
  const dialogName = toUnderscore(dialog.name)

  let url = renderData_BlockApiEndpoint(resource, view, block)
  url = dialog.pathScope === DialogPathScope.Collection ? `${url}/${dialogPath}` : `${url}/\${subid}/${dialogPath}`

  return {
    componentName: `${toCamelize(blockName)}Block${toCamelize(dialogName)}Dialog`,
    componentNamePath: `dac-${blockPath}-block-${dialogPath}-dialog`,
    componentImportPath: `@/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block-${dialogPath}-dialog.vue`,
    api: { url },
    apiImportPath: `@/api/modules/${resourcePath}/${viewPath}/${blockPath}-block-${dialogPath}-dialog`,
    title: {
      i18nKey: `${xpath}.title`,
      i18nValue: toI18nMessage(dialogName)
    }
  }
}
