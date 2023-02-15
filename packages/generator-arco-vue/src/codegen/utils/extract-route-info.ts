import { Resource, ViewType, View } from '@dulladmin/core'
import { toPath } from '../../naming'
import { extractViewInfo } from './extract-view-info'

export function extractRouteInfo(resource: Resource, view: View): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const _view = extractViewInfo(resource, view)

  let path = ''
  switch (view.type) {
    case ViewType.Index:
      if (resource.singular) throw Error('Unreachable')
      path = `${resourceName}`
      break
    case ViewType.Show:
      path = resource.singular ? `${resourceName}` : `${resourceName}/:id`
      break
    case ViewType.New:
      path = `${resourceName}/new`
      break
    case ViewType.Edit:
      path = resource.singular ? `${resourceName}/edit` : `${resourceName}/:id/edit`
      break
  }

  return {
    name: _view.name,
    path,
    authority: view.authority ?? resource.authority ?? ['*'],
    viewImportPath: `@/views/modules/${resourceName}/${viewName}/index.vue`,
    title: _view.title
  }
}
