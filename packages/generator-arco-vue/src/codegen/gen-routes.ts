import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, ViewType, View } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'

export function genRoutes(resource: Resource): GeneratedFile[] {
  const routes = resource.views.map((view) => {
    const path = genRoutePath(resource, view)
    const name = genRouteName(resource, view)
    const component = genRouteComponent(resource, view)
    return { path, name, component }
  })

  const templateFilePath = path.join(generatorsDir, 'src/router/routes/modules/resource.ts.hbs')
  const templateFileContent = Handlebars.compile(fs.readFileSync(templateFilePath, 'utf-8'))
  return [
    {
      path: `src/router/routes/modules/${resource.name}.ts`,
      content: templateFileContent({ routes })
    }
  ]
}

function genRoutePath(resource: Resource, view: View): string {
  switch (view.type) {
    case ViewType.Index:
      if (resource.singular) throw Error('Unreachable')
      return `${resource.name}`
    case ViewType.Show:
      return resource.singular ? `${resource.name}` : `${resource.name}/:id`
    case ViewType.New:
      return resource.singular ? `${resource.name}/new` : `${resource.name}/:id/new`
    case ViewType.Edit:
      return resource.singular ? `${resource.name}/edit` : `${resource.name}/:id/edit`
  }
}

function genRouteName(resource: Resource, view: View): string {
  return `${resource.name}#${view.type}`
}

function genRouteComponent(_resource: Resource, _view: View): string {
  return ''
}
