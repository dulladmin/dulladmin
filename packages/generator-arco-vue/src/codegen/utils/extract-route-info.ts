import { Resource, ViewType, View } from '@dulladmin/core'
import { toPath } from '../../naming'

export function extractRouteInfo(resource: Resource, view: View): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const i18nKeyPrefix = `${resourceName}--${viewName}`

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
    name: `${resourceName}--${viewName}`,
    path,
    authority: view.authority ?? resource.authority ?? ['*'],
    viewImportPath: `@/views/modules/${resourceName}/${viewName}/index.vue`,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`
    }
  }
}
