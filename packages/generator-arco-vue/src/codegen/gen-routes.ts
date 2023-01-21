import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, ViewType, View } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'
import { toPath } from '../naming'

export function genRoutes(resource: Resource): GeneratedFile[] {
  const routes = resource.views.map((view) => calcRouteInfo(resource, view))

  const infileRawPath = 'src/router/routes/modules/__resource__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const outfilePath = `src/router/routes/modules/${resourceName}.ts`
  const outfileContent = infileContent({ routes })
  const outfile = { path: outfilePath, content: outfileContent }

  return ([] as GeneratedFile[]).concat([outfile])
}

function calcRouteInfo(resource: Resource, view: View): Record<string, string> {
  const path = calcRoutePath(resource, view)
  const name = calcRouteName(resource, view)
  const component = calcRouteComponent(resource, view)
  return { path, name, component }
}

function calcRoutePath(resource: Resource, view: View): string {
  const resourceName = toPath(resource.name)

  switch (view.type) {
    case ViewType.Index:
      if (resource.singular) throw Error('Unreachable')
      return `${resourceName}`
    case ViewType.Show:
      return resource.singular ? `${resourceName}` : `${resourceName}/:id`
    case ViewType.New:
      return resource.singular ? `${resourceName}/new` : `${resourceName}/:id/new`
    case ViewType.Edit:
      return resource.singular ? `${resourceName}/edit` : `${resourceName}/:id/edit`
  }
}

function calcRouteName(resource: Resource, view: View): string {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  return `${resourceName}--${viewName}`
}

function calcRouteComponent(resource: Resource, view: View): string {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  return `@/views/modules/${resourceName}/${viewName}/index.vue`
}
