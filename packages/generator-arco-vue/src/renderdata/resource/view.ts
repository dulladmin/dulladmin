/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, ViewType, View } from '@dulladmin/core'
import { toCamelize, toI18nMessage, toPath } from '../../naming'

export function renderData_View(resource: Resource, view: View): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const i18nKeyPrefix = `${resourceName}--${viewName}`

  return {
    name: `${toCamelize(resourceName)}${toCamelize(viewName)}`,
    authority: view.inheritedAuthority,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(resourceName)} ${toI18nMessage(viewName)}`
    }
  }
}

export function renderData_ViewRoute(resource: Resource, view: View): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const _view = renderData_View(resource, view)

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
