/* eslint-disable @typescript-eslint/naming-convention */
import {
  Resource,
  View,
  BlockType,
  BlockRelationshipType,
  Block,
  TableBlock,
  DescriptionsBlock,
  FormBlock,
  DialogBlockType,
  Dialog,
  Model
} from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import {
  renderData_View,
  renderData_Block,
  renderData_TableBlock,
  renderData_DescriptionsBlock,
  renderData_FormBlock,
  renderData_DescriptionsDialog,
  renderData_FormDialog
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
      if (!['new', 'show', 'edit', 'delete'].includes(view.name)) return
      const _view = renderData_View(resource, view)
      resourceActions[view.name] = {
        name: _view.name,
        authority: _view.authority,
        isMemberAction: _view.isMemberAction
      }
    })
  }

  // customOperations
  const _view = renderData_View(resource, view)
  const _block = renderData_TableBlock(resource, view, block)
  const _customOperations: Array<Record<string, any>> = []
  Object.values<Record<string, any>>(_block.operations).forEach((operation) => {
    if (['new', 'show', 'edit', 'delete'].includes(operation.name)) return
    _customOperations.push(operation)
  })
  _customOperations.sort((a, b) => a.order - b.order)

  // outfile
  const blockOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__table_block__.vue.hbs',
    { ..._block, view: _view, resourceActions, customOperations: _customOperations }
  )
  const dialogOutfiles = block.operations.map((operation) => {
    return genView_Dialog(resource, view, block, operation.dialog)
  })

  return [blockOutfile, ...dialogOutfiles]
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

  // formOptions
  const name = block.relType === BlockRelationshipType.Self ? view.name : block.relName
  const formOptions = genView_buildFormOptions(name, block.model)
  formOptions.allowBackOnSave = block.relType === BlockRelationshipType.Self

  // outfile
  const _view = renderData_View(resource, view)
  const _block = renderData_FormBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block.vue`,
    'src/views/modules/__resource__/__view__/components/__form_block__.vue.hbs',
    { ..._block, view: _view, formOptions }
  )

  return [blockOutfile]
}

function genView_Dialog(resource: Resource, view: View, block: Block, dialog: Dialog): GeneratedFile {
  switch (dialog.block.type) {
    case DialogBlockType.DescriptionsBlock:
      return genView_DescriptionsDialog(resource, view, block, dialog)
    case DialogBlockType.FormBlock:
      return genView_FormDialog(resource, view, block, dialog)
  }
}

function genView_DescriptionsDialog(resource: Resource, view: View, block: Block, dialog: Dialog): GeneratedFile {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const dialogPath = toPath(dialog.name)

  const _block = renderData_Block(resource, view, block)
  const _dialog = renderData_DescriptionsDialog(resource, view, block, dialog)
  const dialogOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block-${dialogPath}-dialog.vue`,
    'src/views/modules/__resource__/__view__/components/dialog/__descriptions_dialog__.vue.hbs',
    { ..._dialog, block: _block }
  )

  return dialogOutfile
}

function genView_FormDialog(resource: Resource, view: View, block: Block, dialog: Dialog): GeneratedFile {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const dialogPath = toPath(dialog.name)

  // formOptions
  const name = dialog.name
  const formOptions = genView_buildFormOptions(name, dialog.block.model)

  // outfile
  const _block = renderData_Block(resource, view, block)
  const _dialog = renderData_FormDialog(resource, view, block, dialog)
  const dialogOutfile = handlebarsFile(
    `src/views/modules/${resourcePath}/${viewPath}/components/${blockPath}-block-${dialogPath}-dialog.vue`,
    'src/views/modules/__resource__/__view__/components/dialog/__form_dialog__.vue.hbs',
    { ..._dialog, block: _block, formOptions }
  )

  return dialogOutfile
}

function genView_buildFormOptions(name: string, model: Model): Record<string, any> {
  const formOptions: Record<string, any> = {
    actionName: 'save',
    noGet: model.attributes.length === 0
  }
  const actionName = name.split('_')[0]
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
  return formOptions
}
