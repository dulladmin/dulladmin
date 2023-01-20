import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, View } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'

export function genViews(resource: Resource): GeneratedFile[] {
  return resource.views.map((view) => genView(resource, view)).reduce((acc, files) => acc.concat(files)) ?? []
}

function genView(resource: Resource, view: View): GeneratedFile[] {
  const templateFilePath = path.join(generatorsDir, 'src/views/modules/__resource__/__view__/index.vue.hbs')
  const templateFileContent = Handlebars.compile(fs.readFileSync(templateFilePath, 'utf-8'))
  return [
    {
      path: `src/views/modules/${resource.name}/${view.type}/index.vue`,
      content: templateFileContent({})
    }
  ]
}
