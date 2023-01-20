import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, ViewType, View } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'

export function genRoutes(resource: Resource): GeneratedFile[] {
  const routes = resource.views.map((view) => calcRouteInfo(resource, view))
  return [buildRouteInfoFile(resource, routes)]
}

function calcRouteInfo(resource: Resource, view: View): Record<string, string> {
  const path = calcRoutePath(resource, view)
  const name = calcRouteName(resource, view)
  const component = calcRouteComponent(resource, view)
  return { path, name, component }
}

function calcRoutePath(resource: Resource, view: View): string {
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

function calcRouteName(resource: Resource, view: View): string {
  return `${resource.name}#${view.type}`
}

function calcRouteComponent(resource: Resource, view: View): string {
  return `@/views/modules/${resource.name}/${view.type}/index.vue`
}

function buildRouteInfoFile(resource: Resource, routes: Array<Record<string, string>>): GeneratedFile {
  const infilePath = path.join(generatorsDir, 'src/router/routes/modules/__resource__.ts.hbs')
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))
  const outfilePath = `src/router/routes/modules/${resource.name}.ts`
  const outfileContent = infileContent({ routes })
  return { path: outfilePath, content: outfileContent }
}
