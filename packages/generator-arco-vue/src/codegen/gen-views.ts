/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import inflection from 'inflection'
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'

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
  const blockFiles = view.blocks
    .map((block) => genViews_Block(resource, view, block))
    .reduce<GeneratedFile[]>((acc, file) => acc.concat([file]), [])

  const blocks = view.blocks.map((block) => calcBlockInfo(resource, view, block))
  const infilePath = path.join(generatorsDir, 'src/views/modules/__resource__/__view__/index.vue.hbs')
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))
  const outfilePath = `src/views/modules/${resource.name}/${view.type}/index.vue`
  const outfileContent = infileContent({ blocks })
  const viewFile = { path: outfilePath, content: outfileContent }

  return ([] as GeneratedFile[]).concat(blockFiles).concat([viewFile])
}

function genViews_Block(resource: Resource, view: View, block: Block): GeneratedFile {
  switch (block.type) {
    case BlockType.TableBlock:
      return genViews_TableBlock(resource, view, block)
    case BlockType.DescriptionsBlock:
      return genViews_DescriptionsBlock(resource, view, block)
    case BlockType.FormBlock:
      return genViews_FormBlock(resource, view, block)
  }
}

function genViews_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile {
  const infilePath = path.join(
    generatorsDir,
    'src/views/modules/__resource__/__view__/components/__table_block__.vue.hbs'
  )
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))
  const outfilePath = `src/views/modules/${resource.name}/${view.type}/components/${block.relName}-block.vue`
  const outfileContent = infileContent({})
  return { path: outfilePath, content: outfileContent }
}

function genViews_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const infilePath = path.join(
    generatorsDir,
    'src/views/modules/__resource__/__view__/components/__descriptions_block__.vue.hbs'
  )
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))
  const outfilePath = `src/views/modules/${resource.name}/${view.type}/components/${block.relName}-block.vue`
  const outfileContent = infileContent({})
  return { path: outfilePath, content: outfileContent }
}

function genViews_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const infilePath = path.join(
    generatorsDir,
    'src/views/modules/__resource__/__view__/components/__form_block__.vue.hbs'
  )
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))
  const outfilePath = `src/views/modules/${resource.name}/${view.type}/components/${block.relName}-block.vue`
  const outfileContent = infileContent({})
  return { path: outfilePath, content: outfileContent }
}

function calcBlockInfo(resource: Resource, view: View, block: Block): Record<string, string> {
  const componentName = calcBlockComponentName(resource, view, block)
  const componentPath = calcBlockComponentPath(resource, view, block)
  return { componentName, componentPath }
}

function calcBlockComponentName(_resource: Resource, _view: View, block: Block): string {
  return `${inflection.camelize(block.relName)}Block`
}

function calcBlockComponentPath(_resource: Resource, _view: View, block: Block): string {
  return `./components/${block.relName}-block.vue`
}
