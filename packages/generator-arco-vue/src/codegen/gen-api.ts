/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'
import { toPath } from '../naming'
import { extraceApiInfo, extractModelInfo } from './info'

export function genAPI(resource: Resource): GeneratedFile[] {
  return genAPI_Resource(resource)
}

function genAPI_Resource(resource: Resource): GeneratedFile[] {
  return resource.views
    .map((view) => genAPI_View(resource, view))
    .reduce<GeneratedFile[]>((acc, files) => acc.concat(files), [])
}

function genAPI_View(resource: Resource, view: View): GeneratedFile[] {
  return view.blocks
    .map((block) => genAPI_Block(resource, view, block))
    .reduce<GeneratedFile[]>((acc, file) => acc.concat([file]), [])
}

function genAPI_Block(resource: Resource, view: View, block: Block): GeneratedFile {
  switch (block.type) {
    case BlockType.TableBlock:
      return genAPI_TableBlock(resource, view, block)
    case BlockType.DescriptionsBlock:
      return genAPI_DescriptionsBlock(resource, view, block)
    case BlockType.FormBlock:
      return genAPI_FormBlock(resource, view, block)
  }
}

function genAPI_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile {
  const api = extraceApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const infileRawPath = 'src/api/modules/__resource__/__view__/__table_block__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/api/modules/${resourceName}/${viewName}/${blockName}.ts`
  const outfileContent = infileContent({ api, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}

function genAPI_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const api = extraceApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const infileRawPath = 'src/api/modules/__resource__/__view__/__descriptions_block__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/api/modules/${resourceName}/${viewName}/${blockName}.ts`
  const outfileContent = infileContent({ api, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}

function genAPI_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const api = extraceApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const infileRawPath = 'src/api/modules/__resource__/__view__/__form_block__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/api/modules/${resourceName}/${viewName}/${blockName}.ts`
  const outfileContent = infileContent({ api, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}
