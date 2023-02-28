/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import { renderData_TableBlock, renderData_DescriptionsBlock, renderData_FormBlock } from '../../renderdata'
import { handlebarsFile } from '../base'

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
  const _block = renderData_TableBlock(resource, view, block)
  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}.ts`,
    'src/api/modules/__resource__/__view__/__table_block__.ts.hbs',
    { ..._block }
  )
}

function genAPI_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const _block = renderData_DescriptionsBlock(resource, view, block)
  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}.ts`,
    'src/api/modules/__resource__/__view__/__descriptions_block__.ts.hbs',
    { ..._block }
  )
}

function genAPI_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const _block = renderData_FormBlock(resource, view, block)
  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}.ts`,
    'src/api/modules/__resource__/__view__/__form_block__.ts.hbs',
    { ..._block }
  )
}
