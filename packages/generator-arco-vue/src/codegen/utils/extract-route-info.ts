import { Resource, ViewType, View } from '@dulladmin/core'
import { toCamelize, toPath } from '../../naming'
import { extractViewInfo } from './extract-view-info'

export function extractRouteInfo(resource: Resource, view: View): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const _view = extractViewInfo(resource, view)

  let path = ''
  let cache = false
  switch (view.type) {
    case ViewType.Index:
      if (resource.singular) throw Error('Unreachable')
      path = `${resourceName}`
      cache = true
      break
    case ViewType.Show:
      path = resource.singular ? `${resourceName}` : `${resourceName}/:id`
      cache = resource.singular
      break
    case ViewType.New:
      path = `${resourceName}/new`
      break
    case ViewType.Edit:
      path = resource.singular ? `${resourceName}/edit` : `${resourceName}/:id/edit`
      break
    case ViewType.Delete:
      path = resource.singular ? `${resourceName}/delete` : `${resourceName}/:id/delete`
      break
  }

  return {
    name: _view.name,
    path,
    title: _view.title,
    viewImportPath: `@/views/modules/${resourceName}/${viewName}/index.vue`,
    viewName: [toCamelize(resourceName), toCamelize(viewName)],
    authority: view.inheritedAuthority ?? ['*'],
    cache
  }
}
