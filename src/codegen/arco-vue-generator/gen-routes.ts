import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, ViewType, View } from '@/parser'
import type { GeneratedFile } from '@/codegen/generator'
import { generatorsDir } from './files'

const templateFilePath = path.join(generatorsDir, 'src/router/routes/modules/resource.ts.hbs')
const templateFile = Handlebars.compile(fs.readFileSync(templateFilePath, 'utf-8'))

export default function genRoutes(resource: Resource): GeneratedFile[] {
  const routes = resource.views.map((view) => {
    const path = genRoutePath(resource, view)
    const name = genRouteName(resource, view)
    const component = genRouteComponent(resource, view)
    return { path, name, component }
  })
  return [
    {
      name: `src/router/routes/modules/${resource.name}.ts`,
      content: templateFile({ routes })
    }
  ]
}

function genRoutePath(resource: Resource, view: View): string {
  switch (view.type) {
    case ViewType.Index:
      if (resource.singular) throw new Error('')
      return `${resource.name}`
    case ViewType.Show:
      return resource.singular ? `${resource.name}` : `${resource.name}/:id`
    case ViewType.New:
      return resource.singular ? `${resource.name}/new` : `${resource.name}/:id/new`
    case ViewType.Edit:
      return resource.singular ? `${resource.name}/edit` : `${resource.name}/:id/edit`
    default:
      throw new Error('')
  }
}

function genRouteName(resource: Resource, view: View): string {
  return `${resource.name}#${view.type}`
}

function genRouteComponent(resource: Resource, view: View): string {
  return ''
}
