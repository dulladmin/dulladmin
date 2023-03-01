/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, ViewPathScope, View } from '@dulladmin/core'
import { toCamelize, toI18nMessage, toPath } from '../../naming'

export function renderData_View(resource: Resource, view: View): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const i18nKeyPrefix = `${resourcePath}--${viewPath}`

  return {
    name: `${toCamelize(resourcePath)}${toCamelize(viewPath)}`,
    authority: view.inheritedAuthority,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(resourcePath)} ${toI18nMessage(viewPath)}`
    }
  }
}

export function renderData_ViewRoute(resource: Resource, view: View): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const _view = renderData_View(resource, view)

  let path = ''
  let cache = false
  switch (view.name) {
    case 'index':
      if (resource.singular) throw Error('Unreachable')
      path = `${resourcePath}`
      cache = true
      break
    case 'new':
      path = `${resourcePath}/new`
      break
    case 'show':
      if (resource.singular) {
        path = `${resourcePath}`
        cache = true
      } else {
        path = `${resourcePath}/:id`
      }
      break
    case 'edit':
    case 'delete':
      if (resource.singular) {
        path = `${resourcePath}/${viewPath}`
      } else {
        path = `${resourcePath}/:id/${viewPath}`
      }
      break
    default:
      if (resource.singular || view.pathScope === ViewPathScope.Collection) {
        path = `${resourcePath}/${viewPath}`
      } else {
        path = `${resourcePath}/:id/${viewPath}`
      }
      break
  }

  return {
    name: _view.name,
    path,
    title: _view.title,
    viewImportPath: `@/views/modules/${resourcePath}/${viewPath}/index.vue`,
    viewPath: [toCamelize(resourcePath), toCamelize(viewPath)],
    authority: view.inheritedAuthority ?? ['*'],
    cache
  }
}
