/* eslint-disable @typescript-eslint/naming-convention */
import {
  Resource,
  ViewType,
  View,
  BlockType,
  BlockRelationshipType,
  Block,
  TableBlock,
  DescriptionsBlock,
  FormBlock
} from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import {
  extractBlockInfo,
  extractBlockSorterInfo,
  extractBlockSearcherInfo,
  extractModelInfo,
  extractViewInfo,
  enhanceModelInfoWithSorter,
  handlebarsFile
} from '../utils'

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

  const _view = extractViewInfo(resource, view)
  const blocks = view.blocks.map((block) => extractBlockInfo(resource, view, block))
  const viewOutfile = handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/index.vue`,
    'src/views/modules/__resource__/__view__/index.vue.hbs',
    { ..._view, blocks }
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
  const _view = extractViewInfo(resource, view)
  const _block = extractBlockInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const sorters = extractBlockSorterInfo(resource, view, block)
  const sortable = sorters.length !== 0
  enhanceModelInfoWithSorter(model, sorters)

  const searchers = extractBlockSearcherInfo(resource, view, block)
  const searchable = searchers.length !== 0

  const pagination = {
    per: block.pagination?.per
  }

  const resourceActions: Record<string, any> = {}
  if (view.type === ViewType.Index && block.relType === BlockRelationshipType.Self) {
    resource.views.forEach((view) => {
      const _view = extractViewInfo(resource, view)
      resourceActions[view.type] = {
        authority: view.authority ?? resource.authority,
        name: _view.name
      }
    })
  }

  return handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/components/${toPath(block.relName)}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__table_block__.vue.hbs',
    { view: _view, block: _block, model, sortable, searchers, searchable, pagination, resourceActions }
  )
}

function genViews_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const _view = extractViewInfo(resource, view)
  const _block = extractBlockInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  return handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/components/${toPath(block.relName)}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__descriptions_block__.vue.hbs',
    { view: _view, block: _block, model }
  )
}

function genViews_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const _view = extractViewInfo(resource, view)
  const _block = extractBlockInfo(resource, view, block)
  const model = extractModelInfo(resource, view, block)

  const form: Record<string, any> = { allowBackOnSave: false, defaultActionName: 'save' }
  if (block.relType === BlockRelationshipType.Self) {
    form.allowBackOnSave = true
    form.defaultActionName = view.type
  }

  return handlebarsFile(
    `src/views/modules/${toPath(resource.name)}/${toPath(view.type)}/components/${toPath(block.relName)}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__form_block__.vue.hbs',
    { view: _view, block: _block, model, form }
  )
}
