/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'
import { toPath } from '../naming'
import { extractApiInfo, extractModelInfo, extractBlockInfo } from './info'

export function genViews(resource: Resource): GeneratedFile[] {
  return genViews_Resource(resource)
}

function genViews_Resource(resource: Resource): GeneratedFile[] {
  return resource.views.map((view) => genViews_View(resource, view)).reduce<GeneratedFile[]>((a, v) => [...a, ...v], [])
}

function genViews_View(resource: Resource, view: View): GeneratedFile[] {
  const blockOutfiles = view.blocks
    .map((block) => genViews_Block(resource, view, block))
    .reduce<GeneratedFile[]>((a, v) => [...a, v], [])

  const blocks = view.blocks.map((block) => extractBlockInfo(resource, view, block))

  const infileRawPath = 'src/views/modules/__resource__/__view__/index.vue.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const outfilePath = `src/views/modules/${resourceName}/${viewName}/index.vue`
  const outfileContent = infileContent({ blocks })
  const viewOutfile = { path: outfilePath, content: outfileContent }

  return ([] as GeneratedFile[]).concat(blockOutfiles).concat([viewOutfile])
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
  const blockInfo = extractBlockInfo(resource, view, block)
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const infileRawPath = 'src/views/modules/__resource__/__view__/components/__table_block__.vue.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/views/modules/${resourceName}/${viewName}/components/${blockName}-block.vue`
  const outfileContent = infileContent({ block: blockInfo, api, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}

function genViews_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const blockInfo = extractBlockInfo(resource, view, block)
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const infileRawPath = 'src/views/modules/__resource__/__view__/components/__descriptions_block__.vue.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/views/modules/${resourceName}/${viewName}/components/${blockName}-block.vue`
  const outfileContent = infileContent({ block: blockInfo, api, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}

function genViews_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const blockInfo = extractBlockInfo(resource, view, block)
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const infileRawPath = 'src/views/modules/__resource__/__view__/components/__form_block__.vue.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/views/modules/${resourceName}/${viewName}/components/${blockName}-block.vue`
  const outfileContent = infileContent({ block: blockInfo, api, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}
