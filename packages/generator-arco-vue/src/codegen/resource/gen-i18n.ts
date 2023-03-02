/* eslint-disable @typescript-eslint/naming-convention */
import {
  Resource,
  View,
  BlockType,
  Block,
  TableBlock,
  DescriptionsBlock,
  FormBlock,
  DialogBlockType,
  Dialog
} from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import {
  renderData_View,
  renderData_TableBlock,
  renderData_DescriptionsBlock,
  renderData_FormBlock,
  renderData_DescriptionsDialog,
  renderData_FormDialog
} from '../../renderdata'
import { i18nFile } from '../base'

export function genI18n(resource: Resource): GeneratedFile[] {
  return genI18n_Resource(resource)
}

function genI18n_Resource(resource: Resource): GeneratedFile[] {
  const messages = resource.views
    .map((view) => genI18n_View(resource, view))
    .reduce<Record<string, string>>((a, v) => ({ ...a, ...v }), {})
  return i18nFile(toPath(resource.name), messages)
}

function genI18n_View(resource: Resource, view: View): Record<string, string> {
  const _view = renderData_View(resource, view)
  const viewMessages = {
    [_view.title.i18nKey]: _view.title.i18nValue
  }

  const blocksMessages = view.blocks
    .map((block) => genI18n_Block(resource, view, block))
    .reduce<Record<string, string>>((a, v) => ({ ...a, ...v }), {})

  return { ...viewMessages, ...blocksMessages }
}

function genI18n_Block(resource: Resource, view: View, block: Block): Record<string, string> {
  switch (block.type) {
    case BlockType.TableBlock:
      return genI18n_TableBlock(resource, view, block as TableBlock)
    case BlockType.DescriptionsBlock:
      return genI18n_DescriptionsBlock(resource, view, block as DescriptionsBlock)
    case BlockType.FormBlock:
      return genI18n_FormBlock(resource, view, block as FormBlock)
  }
}

function genI18n_TableBlock(resource: Resource, view: View, block: TableBlock): Record<string, string> {
  const _block = renderData_TableBlock(resource, view, block)
  const blockMessages = {
    [_block.title.i18nKey]: _block.title.i18nValue
  }

  _block.searchers.forEach((searcher: Record<string, any>) => {
    blockMessages[searcher.i18nKey] = searcher.i18nValue
    searcher.optionals?.forEach((opt: Record<string, any>) => (blockMessages[opt.i18nKey] = opt.i18nValue))
  })

  const dialogMessages = block.operations
    .map((operation) => genI18n_Dialog(resource, view, block, operation.dialog))
    .reduce<Record<string, string>>((a, v) => ({ ...a, ...v }), {})

  return { ...blockMessages, ...genI18n_Model(_block.model), ...dialogMessages }
}

function genI18n_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): Record<string, string> {
  const _block = renderData_DescriptionsBlock(resource, view, block)
  const blockMessages = {
    [_block.title.i18nKey]: _block.title.i18nValue
  }

  return { ...blockMessages, ...genI18n_Model(_block.model) }
}

function genI18n_FormBlock(resource: Resource, view: View, block: FormBlock): Record<string, string> {
  const _block = renderData_FormBlock(resource, view, block)
  const blockMessages = {
    [_block.title.i18nKey]: _block.title.i18nValue
  }

  return { ...blockMessages, ...genI18n_Model(_block.model) }
}

function genI18n_Dialog(resource: Resource, view: View, block: Block, dialog: Dialog): Record<string, string> {
  switch (dialog.block.type) {
    case DialogBlockType.DescriptionsBlock:
      return genI18n_DescriptionsDialog(resource, view, block, dialog)
    case DialogBlockType.FormBlock:
      return genI18n_FormDialog(resource, view, block, dialog)
  }
}

function genI18n_DescriptionsDialog(
  resource: Resource,
  view: View,
  block: Block,
  dialog: Dialog
): Record<string, string> {
  const _dialog = renderData_DescriptionsDialog(resource, view, block, dialog)
  return { ...genI18n_Model(_dialog.model) }
}

function genI18n_FormDialog(resource: Resource, view: View, block: Block, dialog: Dialog): Record<string, string> {
  const _dialog = renderData_FormDialog(resource, view, block, dialog)
  return { ...genI18n_Model(_dialog.model) }
}

function genI18n_Model(model: Record<string, any>): Record<string, string> {
  const messages: Record<string, string> = {}
  model.attributes.forEach((attr: Record<string, any>) => {
    messages[attr.i18nKey] = attr.i18nValue
    attr.optionals?.forEach((opt: Record<string, any>) => (messages[opt.i18nKey] = opt.i18nValue))
    attr.object?.attributes?.forEach((objAttr: Record<string, any>) => {
      messages[objAttr.i18nKey] = objAttr.i18nValue
      objAttr.optionals?.forEach((objOpt: Record<string, any>) => (messages[objOpt.i18nKey] = objOpt.i18nValue))
    })
  })
  return messages
}
