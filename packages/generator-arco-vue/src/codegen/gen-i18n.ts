/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, BlockType, Block, TableBlock, DescriptionsBlock, FormBlock } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../naming'
import { extractModelInfo } from './info'

export function genI18n(resource: Resource): GeneratedFile[] {
  return genI18n_Resource(resource)
}

function genI18n_Resource(resource: Resource): GeneratedFile[] {
  return resource.views.map((view) => genI18n_View(resource, view)).reduce<GeneratedFile[]>((a, v) => [...a, ...v], [])
}

function genI18n_View(resource: Resource, view: View): GeneratedFile[] {
  const messages = view.blocks
    .map((block) => genI18n_Block(resource, view, block))
    .reduce<Record<string, string>>((a, v) => ({ ...a, ...v }), {})

  const defaultLocale = 'en-US'
  const availableLocales = ['en-US', 'zh-CN']
  return availableLocales.map((locale) => {
    const i18nMessages =
      locale === defaultLocale ? messages : Object.keys(messages).reduce((a, v) => ({ ...a, [v]: null }), {})

    const resourceName = toPath(resource.name)
    const outfilePath = `src/locale/${locale}/modules/${resourceName}.json`
    const outfileContent = JSON.stringify(i18nMessages, null, 2)
    return { path: outfilePath, content: outfileContent }
  })
}

function genI18n_Block(resource: Resource, view: View, block: Block): Record<string, string> {
  switch (block.type) {
    case BlockType.TableBlock:
      return genI18n_TableBlock(resource, view, block)
    case BlockType.DescriptionsBlock:
      return genI18n_DescriptionsBlock(resource, view, block)
    case BlockType.FormBlock:
      return genI18n_FormBlock(resource, view, block)
  }
}

function genI18n_TableBlock(resource: Resource, view: View, block: TableBlock): Record<string, string> {
  return genI18n_Model(resource, view, block)
}

function genI18n_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): Record<string, string> {
  return genI18n_Model(resource, view, block)
}

function genI18n_FormBlock(resource: Resource, view: View, block: FormBlock): Record<string, string> {
  return genI18n_Model(resource, view, block)
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
