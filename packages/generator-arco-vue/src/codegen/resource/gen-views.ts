/* eslint-disable @typescript-eslint/naming-convention */
import {
  Resource,
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
  renderData_View,
  renderData_Block,
  renderData_TableBlock,
  renderData_DescriptionsBlock,
  renderData_FormBlock
} from '../../renderdata'
import { handlebarsFile } from '../base'

export function genViews(resource: Resource): GeneratedFile[] {
  return genViews_Resource(resource)
}

function genViews_Resource(resource: Resource): GeneratedFile[] {
  return resource.views.map((view) => genViews_View(resource, view)).reduce<GeneratedFile[]>((a, v) => [...a, ...v], [])
}

function genViews_View(resource: Resource, view: View): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)

  const _view = renderData_View(resource, view)
  const blocks = view.blocks.map((block) => renderData_Block(resource, view, block))
  const viewOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/index.vue`,
    'src/views/modules/__resource__/__view__/index.vue.hbs',
    { ..._view, blocks }
  )

  const blockOutfiles = view.blocks
    .map((block) => genViews_Block(resource, view, block))
    .reduce<GeneratedFile[]>((a, v) => [...a, ...v], [])

  return [viewOutfile, ...blockOutfiles]
}

function genViews_Block(resource: Resource, view: View, block: Block): GeneratedFile[] {
  switch (block.type) {
    case BlockType.TableBlock:
      return genViews_TableBlock(resource, view, block as TableBlock)
    case BlockType.DescriptionsBlock:
      return genViews_DescriptionsBlock(resource, view, block as DescriptionsBlock)
    case BlockType.FormBlock:
      return genViews_FormBlock(resource, view, block as FormBlock)
  }
}

function genViews_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)

  // self Table in IndexView
  const resourceActions: Record<string, any> = {}
  if (block.relType === BlockRelationshipType.Self && view.name === 'index') {
    resource.views.forEach((view) => {
      const _view = renderData_View(resource, view)
      resourceActions[view.name] = {
        authority: _view.authority,
        name: _view.name
      }
    })
  }

  const _view = renderData_View(resource, view)
  const _block = renderData_TableBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__table_block__.vue.hbs',
    { ..._block, view: _view, resourceActions }
  )

  return [blockOutfile]
}

function genViews_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)

  const _view = renderData_View(resource, view)
  const _block = renderData_DescriptionsBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__descriptions_block__.vue.hbs',
    { ..._block, view: _view }
  )

  return [blockOutfile]
}

function genViews_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)

  // self Form in NewView/EditView/DeleteView
  const formOptions: Record<string, any> = { actionName: 'save' }
  if (block.relType === BlockRelationshipType.Self) {
    formOptions.allowBackOnSave = true

    const actionName = view.name.split('_')[0]
    switch (actionName) {
      case 'new':
      case 'edit':
      case 'delete':
        formOptions.actionName = actionName
        formOptions.isDanger = actionName === 'delete'
        break
      default:
        break
    }
  }

  const _view = renderData_View(resource, view)
  const _block = renderData_FormBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__form_block__.vue.hbs',
    { ..._block, view: _view, formOptions }
  )

  return [blockOutfile]
}
