/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import { extractApiInfo, extractModelInfo, extractBlockInfo } from '../info'
import { handlebarsFile } from '../generated'

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
  const viewOutfile = handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/index.vue`,
    'src/views/modules/__resource__/__view__/index.vue.hbs',
    { blocks }
  )

  return [...blockOutfiles, viewOutfile]
}

function genViews_Block(resource: Resource, view: View, block: Block): GeneratedFile {
  switch (block.type) {
    case BlockType.TableBlock:
      return genViews_TableBlock(resource, view, block as TableBlock)
    case BlockType.DescriptionsBlock:
      return genViews_DescriptionsBlock(resource, view, block as DescriptionsBlock)
    case BlockType.FormBlock:
      return genViews_FormBlock(resource, view, block as FormBlock)
  }
}

function genViews_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile {
  const blockInfo = extractBlockInfo(resource, view, block)
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  return handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/components/${toPath(block.relName)}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__table_block__.vue.hbs',
    { block: blockInfo, api, model }
  )
}

function genViews_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const blockInfo = extractBlockInfo(resource, view, block)
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  return handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/components/${toPath(block.relName)}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__descriptions_block__.vue.hbs',
    { block: blockInfo, api, model }
  )
}

function genViews_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const blockInfo = extractBlockInfo(resource, view, block)
  const api = extractApiInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  return handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/components/${toPath(block.relName)}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__form_block__.vue.hbs',
    { block: blockInfo, api, model }
  )
}
