/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import { extractModelInfo, extractBlockInfo } from '../info'
import { i18nFile } from '../generated'

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
  return view.blocks
    .map((block) => genI18n_Block(resource, view, block))
    .reduce<Record<string, string>>((a, v) => ({ ...a, ...v }), {})
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
  const blockInfo = extractBlockInfo(resource, view, block)
  const blockMessages = {
    [blockInfo.title.i18nKey]: blockInfo.title.i18nValue
  }

  return { ...blockMessages, ...genI18n_Model(resource, view, block) }
}

function genI18n_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): Record<string, string> {
  const blockInfo = extractBlockInfo(resource, view, block)
  const blockMessages = {
    [blockInfo.title.i18nKey]: blockInfo.title.i18nValue
  }

  return { ...blockMessages, ...genI18n_Model(resource, view, block) }
}

function genI18n_FormBlock(resource: Resource, view: View, block: FormBlock): Record<string, string> {
  const blockInfo = extractBlockInfo(resource, view, block)
  const blockMessages = {
    [blockInfo.title.i18nKey]: blockInfo.title.i18nValue
  }

  return { ...blockMessages, ...genI18n_Model(resource, view, block) }
}

function genI18n_Model(resource: Resource, view: View, block: Block): Record<string, string> {
  const messages: Record<string, string> = {}
  const model = extractModelInfo(resource, view, block)
  model.attributes.forEach((attr: Record<string, any>) => {
    messages[attr.i18nKey] = attr.i18nValue
    attr.object?.attributes?.forEach((objAttr: Record<string, any>) => (messages[objAttr.i18nKey] = objAttr.i18nValue))
  })
  return messages
}
