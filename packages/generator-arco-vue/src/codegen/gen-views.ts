/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, View } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'

export function genViews(resource: Resource): GeneratedFile[] {
  return genViews_Resource(resource)
}

function genViews_Resource(resource: Resource): GeneratedFile[] {
  return resource.views
    .map((view) => genViews_View(resource, view))
    .reduce<GeneratedFile[]>((acc, files) => acc.concat(files), [])
}

function genViews_View(resource: Resource, view: View): GeneratedFile[] {
  return [buildViewMainFile(resource, view)]
}

function buildViewMainFile(resource: Resource, view: View): GeneratedFile {
  const infilePath = path.join(generatorsDir, 'src/views/modules/__resource__/__view__/index.vue.hbs')
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))
  const outfilePath = `src/views/modules/${resource.name}/${view.type}/index.vue`
  const outfileContent = infileContent({})
  return { path: outfilePath, content: outfileContent }
}
