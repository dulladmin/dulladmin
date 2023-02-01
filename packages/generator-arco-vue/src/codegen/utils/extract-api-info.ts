import { Resource, ViewType, View, Block } from '@dulladmin/core'
import { toPath } from '../../naming'

export function extractApiInfo(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)

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

  return {
    url
  }
}
