/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, Block, DialogPathScope, Dialog } from '@dulladmin/core'
import { toCamelize, toUnderscore, toPath } from '../../../naming'
import { renderData_BlockApiEndpoint } from '../view-block/base'

export function renderData_Dialog(resource: Resource, view: View, block: Block, dialog: Dialog): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const dialogPath = toPath(dialog.name)

  const blockName = toUnderscore(block.relName)
  const dialogName = toUnderscore(dialog.name)

  let url = renderData_BlockApiEndpoint(resource, view, block)
  url = dialog.pathScope === DialogPathScope.Collection ? `${url}/${dialogPath}` : `${url}/\${subid}/${dialogPath}`

  return {
    componentName: `${toCamelize(blockName)}Block${toCamelize(dialogName)}Dialog`,
    componentImportPath: `@/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block-${dialogPath}-dialog.vue`,
    api: { url },
    apiImportPath: `@/api/modules/${resourcePath}/${viewPath}/${blockPath}-block-${dialogPath}-dialog`
  }
}
