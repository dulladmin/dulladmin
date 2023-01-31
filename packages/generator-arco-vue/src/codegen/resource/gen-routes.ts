import { Resource } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import { extractRouteInfo } from '../info'
import { handlebarsFile } from '../generated'

export function genRoutes(resource: Resource): GeneratedFile[] {
  const routes = resource.views.map((view) => extractRouteInfo(resource, view))

  return [
    handlebarsFile(
      `src/router/routes/modules/${toPath(resource.name)}.ts`,
      'src/router/routes/modules/__resource__.ts.hbs',
      { routes }
    )
  ]
}
