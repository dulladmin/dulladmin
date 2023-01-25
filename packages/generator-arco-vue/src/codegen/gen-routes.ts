import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'
import { toPath } from '../naming'
import { extractRouteInfo } from './info'

export function genRoutes(resource: Resource): GeneratedFile[] {
  const routes = resource.views.map((view) => extractRouteInfo(resource, view))

  const infileRawPath = 'src/router/routes/modules/__resource__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const outfilePath = `src/router/routes/modules/${resourceName}.ts`
  const outfileContent = infileContent({ routes })
  const outfile = { path: outfilePath, content: outfileContent }

  return ([] as GeneratedFile[]).concat([outfile])
}
