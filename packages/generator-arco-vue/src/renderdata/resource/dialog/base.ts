/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, Block, Dialog } from '@dulladmin/core'
import { toCamelize, toPath } from '../../../naming'
import { renderData_BlockApiEndpoint } from '../view-block/base'

export function renderData_Dialog(resource: Resource, view: View, block: Block, dialog: Dialog): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const dialogName = toPath(dialog.name)

  let url = renderData_BlockApiEndpoint(resource, view, block)
  if (dialogName.startsWith('new')) {
    url = url + `/${dialogName}`
  } else {
    url = url + `/\${subid}/${dialogName}`
  }

  return {
    componentName: `${toCamelize(block.relName)}Block${toCamelize(dialog.name)}Dialog`,
    componentImportPath: `@/views/modules/${resourceName}/${viewName}/components/${blockName}-block-${dialogName}-dialog.vue`,
    api: { url },
    apiImportPath: `@/api/modules/${resourceName}/${viewName}/${blockName}-block-${dialogName}-dialog`
  }
}
