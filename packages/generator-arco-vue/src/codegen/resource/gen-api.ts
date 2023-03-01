/* eslint-disable @typescript-eslint/naming-convention */
import {
  Resource,
  View,
  BlockType,
  Block,
  TableBlock,
  DescriptionsBlock,
  FormBlock,
  Dialog,
  DialogBlockType
} from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import {
  renderData_TableBlock,
  renderData_DescriptionsBlock,
  renderData_FormBlock,
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
  }
}

function genAPI_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile[] {
  const dialogOutfiles = block.operations.map((operation) => {
    return genAPI_Dialog(resource, view, block, operation.dialog)
  })

  const _block = renderData_TableBlock(resource, view, block)
  const blockOutfile = handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}-block.ts`,
    'src/api/modules/__resource__/__view__/__table_block__.ts.hbs',
    { ..._block }
  )

  return [...dialogOutfiles, blockOutfile]
}

function genAPI_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile[] {
  const _block = renderData_DescriptionsBlock(resource, view, block)
  return [
    handlebarsFile(
      `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}-block.ts`,
      'src/api/modules/__resource__/__view__/__descriptions_block__.ts.hbs',
      { ..._block }
    )
  ]
}

function genAPI_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile[] {
  const _block = renderData_FormBlock(resource, view, block)
  return [
    handlebarsFile(
      `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}-block.ts`,
      'src/api/modules/__resource__/__view__/__form_block__.ts.hbs',
      { ..._block }
    )
  ]
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
  const _dialog = renderData_DescriptionsDialog(resource, view, block, dialog)
  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}-block-${toPath(
      dialog.name
    )}-dialog.ts`,
    'src/api/modules/__resource__/__view__/dialog/__descriptions_dialog__.ts.hbs',
    { ..._dialog }
  )
}

function genAPI_FormDialog(resource: Resource, view: View, block: Block, dialog: Dialog): GeneratedFile {
  const _dialog = renderData_FormDialog(resource, view, block, dialog)
  return handlebarsFile(
    `src/api/modules/${toPath(resource.name)}/${toPath(view.type)}/${toPath(block.relName)}-block-${toPath(
      dialog.name
    )}-dialog.ts`,
    'src/api/modules/__resource__/__view__/dialog/__form_dialog__.ts.hbs',
    { ..._dialog }
  )
}
