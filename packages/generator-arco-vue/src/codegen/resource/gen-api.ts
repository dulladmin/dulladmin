/* eslint-disable @typescript-eslint/naming-convention */
import {
  Resource,
  View,
  BlockType,
  Block,
  TableBlock,
  DescriptionsBlock,
  FormBlock,
  EChartsBlock,
  Dialog,
  DialogBlockType
} from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import {
  renderData_TableBlock,
  renderData_DescriptionsBlock,
  renderData_FormBlock,
  renderData_EChartsBlock,
  renderData_DescriptionsDialog,
  renderData_FormDialog
} from '../../renderdata'
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
    .reduce<GeneratedFile[]>((a, v) => [...a, ...v], [])
}

function genAPI_Block(resource: Resource, view: View, block: Block): GeneratedFile[] {
  switch (block.type) {
    case BlockType.TableBlock:
      return genAPI_TableBlock(resource, view, block as TableBlock)
    case BlockType.DescriptionsBlock:
      return genAPI_DescriptionsBlock(resource, view, block as DescriptionsBlock)
    case BlockType.FormBlock:
      return genAPI_FormBlock(resource, view, block as FormBlock)
    case BlockType.EChartsBlock:
      return genAPI_EChartsBlock(resource, view, block as EChartsBlock)
  }
}

function genAPI_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)

  const _block = renderData_TableBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/api/modules/${resourcePath}/${viewPath}/${blockPath}-block.ts`,
    'src/api/modules/__resource__/__view__/__table_block__.ts.hbs',
    { ..._block }
  )

  const dialogOutfiles = block.operations.map((operation) => {
    return genAPI_Dialog(resource, view, block, operation.dialog)
  })

  return [blockOutfile, ...dialogOutfiles]
}

function genAPI_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)

  const _block = renderData_DescriptionsBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/api/modules/${resourcePath}/${viewPath}/${blockPath}-block.ts`,
    'src/api/modules/__resource__/__view__/__descriptions_block__.ts.hbs',
    { ..._block }
  )

  return [blockOutfile]
}

function genAPI_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)

  const _block = renderData_FormBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/api/modules/${resourcePath}/${viewPath}/${blockPath}-block.ts`,
    'src/api/modules/__resource__/__view__/__form_block__.ts.hbs',
    { ..._block }
  )

  return [blockOutfile]
}

function genAPI_EChartsBlock(resource: Resource, view: View, block: EChartsBlock): GeneratedFile[] {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)

  const _block = renderData_EChartsBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/api/modules/${resourcePath}/${viewPath}/${blockPath}-block.ts`,
    'src/api/modules/__resource__/__view__/__echarts_block__.ts.hbs',
    { ..._block }
  )

  return [blockOutfile]
}

function genAPI_Dialog(resource: Resource, view: View, block: Block, dialog: Dialog): GeneratedFile {
  switch (dialog.block.type) {
    case DialogBlockType.DescriptionsBlock:
      return genAPI_DescriptionsDialog(resource, view, block, dialog)
    case DialogBlockType.FormBlock:
      return genAPI_FormDialog(resource, view, block, dialog)
  }
}

function genAPI_DescriptionsDialog(resource: Resource, view: View, block: Block, dialog: Dialog): GeneratedFile {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)
  const dialogPath = toPath(dialog.name)

  const _dialog = renderData_DescriptionsDialog(resource, view, block, dialog)
  const dialogOutfile = handlebarsFile(
    `src/api/modules/${resourcePath}/${viewPath}/${blockPath}-block-${dialogPath}-dialog.ts`,
    'src/api/modules/__resource__/__view__/dialog/__descriptions_dialog__.ts.hbs',
    { ..._dialog }
  )

  return dialogOutfile
}

function genAPI_FormDialog(resource: Resource, view: View, block: Block, dialog: Dialog): GeneratedFile {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.name)
  const dialogPath = toPath(dialog.name)

  const _dialog = renderData_FormDialog(resource, view, block, dialog)
  const dialogOutfile = handlebarsFile(
    `src/api/modules/${resourcePath}/${viewPath}/${blockPath}-block-${dialogPath}-dialog.ts`,
    'src/api/modules/__resource__/__view__/dialog/__form_dialog__.ts.hbs',
    { ..._dialog }
  )

  return dialogOutfile
}
