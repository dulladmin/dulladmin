/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, TableBlock } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../../naming'
import { toJsonType } from '../../base'
import { renderData_Model } from '../model'
import { renderData_Block } from './base'

export function renderData_TableBlock(resource: Resource, view: View, block: TableBlock): Record<string, any> {
  const _block = renderData_Block(resource, view, block)
  const model = renderData_Model(resource, view, block)

  const searchers = renderData_TableBlockSearchers(resource, view, block)
  const searchable = searchers.length !== 0

  const sorters = renderData_TableBlockSorter(resource, view, block)
  const sortable = sorters.length !== 0
  model.attributes.forEach((attr: Record<string, any>) => {
    const sorter = sorters.find((sorter: Record<string, any>) => sorter.name === attr.name)
    if (sorter != null) attr.sorter = { directions: sorter.directions }
  })

  const pagination = {
    per: block.pagination?.per
  }

  return { ..._block, model, searchers, searchable, sortable, pagination }
}

function renderData_TableBlockSearchers(resource: Resource, view: View, block: TableBlock): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const i18nKeyPrefix = `${resourceName}--${viewName}.${blockName}-block.searchers`

  return block.searchers.map((searcher) => {
    const name = `${searcher.name}_${searcher.predicate}`

    let type = null
    let optionals = null
    if (searcher.type != null) {
      type = searcher.type
      optionals = searcher.optionals
    } else {
      const attr = block.model.attributes.find((attr) => attr.name === searcher.name)!
      type = attr.type
      optionals = attr.optionals
    }

    return {
      name,
      type,
      jsonType: toJsonType(type),
      optionals: optionals?.map((rawOpt) => {
        const opt = String(rawOpt)
        return {
          name: opt,
          i18nKey: `${i18nKeyPrefix}.${name}.optionals.${opt}`,
          i18nValue: toI18nMessage(opt)
        }
      }),
      i18nKey: `${i18nKeyPrefix}.${name}`,
      i18nValue: toI18nMessage(`${searcher.name} ${searcher.predicate}`)
    }
  })
}

function renderData_TableBlockSorter(_resource: Resource, _view: View, block: TableBlock): Record<string, any> {
  return block.sorters.map((sorter) => {
    return {
      name: sorter.name,
      directions: sorter.directions
    }
  })
}
