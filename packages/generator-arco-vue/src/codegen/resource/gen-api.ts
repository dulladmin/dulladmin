/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import { extractApiInfo, extractModelInfo, enhanceModelInfoWithTableSorter, handlebarsFile } from '../utils'

export function genAPI(resource: Resource): GeneratedFile[] {
  return genAPI_Resource(resource)
}

function genAPI_Resource(resource: Resource): GeneratedFile[] {
  return resource.views.map((view) => genAPI_View(resource, view)).reduce<GeneratedFile[]>((a, v) => [...a, ...v], [])
}

function genAPI_View(resource: Resource, view: View): GeneratedFile[] {
  return view.blocks
    .map((block) => genAPI_Block(resource, view, block))
    .reduce<GeneratedFile[]>((a, v) => [...a, v], [])
}

function genAPI_Block(resource: Resource, view: View, block: Block): GeneratedFile {
  switch (block.type) {
    case BlockType.TableBlock:
      return genAPI_TableBlock(resource, view, block as TableBlock)
    case BlockType.DescriptionsBlock:
      return genAPI_DescriptionsBlock(resource, view, block as DescriptionsBlock)
    case BlockType.FormBlock:
      return genAPI_FormBlock(resource, view, block as FormBlock)
  }
}

function genAPI_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile {
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)
  const sorters = block.sorters
  const sortable = sorters.length !== 0
  enhanceModelInfoWithTableSorter(model, sorters)

  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}.ts`,
    'src/api/modules/__resource__/__view__/__table_block__.ts.hbs',
    { api, model, sortable }
  )
}

function genAPI_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}.ts`,
    'src/api/modules/__resource__/__view__/__descriptions_block__.ts.hbs',
    { api, model }
  )
}

function genAPI_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}.ts`,
    'src/api/modules/__resource__/__view__/__form_block__.ts.hbs',
    { api, model }
  )
}
