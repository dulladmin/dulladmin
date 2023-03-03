/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, TableBlock, DialogPathScope, DialogBlockType } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../../naming'
import { toJsonType } from '../../base'
import { renderData_Dialog } from '../dialog'
import { renderData_Model_Block } from '../model'
import { renderData_Block } from './base'

export function renderData_TableBlock(resource: Resource, view: View, block: TableBlock): Record<string, any> {
  const _block = renderData_Block(resource, view, block)
  const model = renderData_Model_Block(resource, view, block)

  const searchers = renderData_TableBlockSearchers(resource, view, block)
  const searchable = searchers.length !== 0

  const sorters = renderData_TableBlockSorter(resource, view, block)
  const sortable = sorters.length !== 0
  model.attributes.forEach((attr: Record<string, any>) => {
    const sorter = sorters.find((sorter: Record<string, any>) => sorter.name === attr.name)
    if (sorter != null) attr.sorter = { directions: sorter.directions }
  })

  const pagination = renderData_TableBlockPagination(resource, view, block)
  const operations = renderData_TableBlockOperations(resource, view, block)

  return { ..._block, model, searchers, searchable, sortable, pagination, operations }
}

function renderData_TableBlockSearchers(resource: Resource, view: View, block: TableBlock): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const i18nKeyPrefix = `${resourcePath}--${viewPath}.${blockPath}-block.searchers`

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

function renderData_TableBlockPagination(_resource: Resource, _view: View, block: TableBlock): Record<string, any> {
  return {
    per: block.pagination?.per
  }
}

function renderData_TableBlockOperations(resource: Resource, view: View, block: TableBlock): Record<string, any> {
  const operations: Record<string, any> = {}
  block.operations.forEach((operation) => {
    operations[operation.name] = {
      name: operation.name,
      authority: operation.inheritedAuthority,
      isMemberAction: operation.dialog.pathScope === DialogPathScope.Member,
      dialog: renderData_Dialog(resource, view, block, operation.dialog),
      useFormDialog: operation.dialog.block.type === DialogBlockType.FormBlock
    }
  })
  return operations
}
