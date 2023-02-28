import { Resource } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import { renderData_ViewRoute } from '../../renderdata'
import { handlebarsFile } from '../base'

export function genRoutes(resource: Resource): GeneratedFile[] {
  const routes = resource.views.map((view) => renderData_ViewRoute(resource, view))

  return [
    handlebarsFile(
      `src/router/routes/modules/${toPath(resource.name)}.ts`,
      'src/router/routes/modules/__resource__.ts.hbs',
      { routes }
    )
  ]
}
