import {
  View,
  TableBlock,
  TableBlockSorter,
  TableBlockSorterDirection,
  TableBlockSearcher,
  TableBlockSearcherPredicate,
  TableBlockPagination,
  TableBlockOperation,
  DescriptionsBlock,
  FormBlock,
  EChartsBlock,
  CustomBlock,
  Block,
  Dialog,
  ScalarValueType,
  Grid,
  GridItem
} from '../../../structs'
import {
  assertFieldNames,
  assertFieldNamesRegexp,
  assertNotNull,
  assertIsArray,
  assertIsObject,
  assertIsString,
  assertIsTableBlockSorterDirection,
  assertIsTableBlockSearcherPredicate,
  assertIsDullAdminScalarValueType
} from '../../assert'
import {
  YamlViewType,
  YamlBlockType,
  YamlBlockTableSorterType,
  YamlBlockTableSearcherType,
  YamlBlockTableOperationsType,
  YamlBlockTableOperationType,
  YamlDialogType,
  YamlGridType
} from '../loader'
import { parseDialog } from './dialog'
import { parseModel } from './model'

export function parseView(doc: YamlViewType, xpath: string, attrs: Record<string, any>): View {
  const { name } = attrs

  const allowedFiledNames = ['authority', 'blocks', 'table', 'descriptions', 'form', 'echarts', 'custom', 'grid']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const authority = doc.authority ?? null
  const authorityXPath = xpath + '/authority'
  if (authority != null) {
    assertIsArray(authority, authorityXPath)
    authority.forEach((item, idx) => {
      assertIsString(item, authorityXPath + `[${idx}]`)
    })
  }

  const parsedBlocks: Block[] = []
  if (doc.blocks != null) {
    const blocks = doc.blocks
    const blocksXPath = xpath + '/blocks'
    assertNotNull(blocks, blocksXPath)
    assertIsArray(blocks, blocksXPath)
    blocks.forEach((block, idx) => {
      parsedBlocks.push(parseBlock(block, blocksXPath + `[${idx}]`))
    })
  }
  if (doc.table != null) {
    const block: YamlBlockType = { table: doc.table }
    parsedBlocks.push(parseBlock(block, xpath))
  }
  if (doc.descriptions != null) {
    const block: YamlBlockType = { descriptions: doc.descriptions }
    parsedBlocks.push(parseBlock(block, xpath))
  }
  if (doc.form != null) {
    const block: YamlBlockType = { form: doc.form }
    parsedBlocks.push(parseBlock(block, xpath))
  }
  if (doc.echarts != null) {
    const block: YamlBlockType = { echarts: doc.echarts }
    parsedBlocks.push(parseBlock(block, xpath))
  }
  if (doc.custom != null) {
    const block: YamlBlockType = { custom: doc.custom }
    parsedBlocks.push(parseBlock(block, xpath))
  }

  let parsedGrid: Grid | null = null
  const grid = doc.grid ?? null
  const gridXPath = xpath + '/grid'
  if (grid != null) {
    assertIsObject(grid, gridXPath)
    parsedGrid = parseGrid(grid, gridXPath)
  }

  return new View(name, authority, parsedBlocks, null, parsedGrid)
}

function parseBlock(doc: YamlBlockType, xpath: string): Block {
  if (doc.name == null) doc.name = 'self'

  const allowedFiledNames = ['name', 'authority', 'table', 'descriptions', 'form', 'echarts', 'custom']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const authority = doc.authority ?? null
  const authorityXPath = xpath + '/authority'
  if (authority != null) {
    assertIsArray(authority, authorityXPath)
    authority.forEach((item, idx) => {
      assertIsString(item, authorityXPath + `[${idx}]`)
    })
  }

  const attrs = { name, authority }
  if (doc.table != null) return parseTableBlock(doc, xpath, attrs)
  if (doc.descriptions != null) return parseDescriptionsBlock(doc, xpath, attrs)
  if (doc.form != null) return parseFormBlock(doc, xpath, attrs)
  if (doc.echarts != null) return parseEChartsBlock(doc, xpath, attrs)
  if (doc.custom != null) return parseCustomBlock(doc, xpath, attrs)
  throw new Error(
    `Block is required in \`${xpath}\`, must be one of ["table", "descriptions", "form", "echarts", "custom"]`
  )
}

function parseTableBlock(doc: YamlBlockType, xpath: string, attrs: Record<string, any>): TableBlock {
  const { name, authority } = attrs
  const table = doc.table ?? {}

  const allowedFiledNames = ['items', 'sorters', 'searchers', 'pagination', 'operations']
  assertFieldNames(table, allowedFiledNames, xpath + '/table')

  const model = table.items
  const modelXPath = xpath + '/table/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath, { table: true })

  let parsedSorters: TableBlockSorter[] = []
  const sorters = table.sorters
  const sortersXPath = xpath + '/table/sorters'
  if (sorters != null) {
    assertIsArray(sorters, sortersXPath)
    parsedSorters = sorters.map((item, idx) => parseTableBlockSorter(item, sortersXPath + `[${idx}]`))
  }

  let parsedSearchers: TableBlockSearcher[] = []
  const searchers = table.searchers
  const searchersXPath = xpath + '/table/searchers'
  if (searchers != null) {
    assertIsArray(searchers, searchersXPath)
    parsedSearchers = searchers.map((item, idx) => parseTableBlockSearcher(item, searchersXPath + `[${idx}]`))
  }

  let parsedPagination: TableBlockPagination | null = null
  const pagination = table.pagination
  if (pagination != null) {
    const per = pagination.per ?? null
    parsedPagination = new TableBlockPagination(per)
  }

  const parsedOperations: TableBlockOperation[] = []
  const operations = table.operations
  const operationsXPath = xpath + '/table/operations'
  if (operations != null) {
    assertIsObject(operations, operationsXPath)
    parseTableBlockOperations(table.operations!, operationsXPath).forEach((item) => {
      parsedOperations.push(item)
    })
  }

  return new TableBlock(
    name,
    authority,
    parsedModel,
    parsedSorters,
    parsedSearchers,
    parsedPagination,
    parsedOperations
  )
}

function parseTableBlockSorter(doc: YamlBlockTableSorterType, xpath: string): TableBlockSorter {
  const allowedFiledNames = ['name', 'directions']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const directions = doc.directions
  const directionsXPath = xpath + '/directions'
  assertNotNull(directions, directionsXPath)
  assertIsArray(directions, directionsXPath)
  const parsedDirections = directions!.map((item, idx) => {
    assertIsTableBlockSorterDirection(item, directionsXPath + `[${idx}]`)
    return item as TableBlockSorterDirection
  })

  return new TableBlockSorter(name!, parsedDirections)
}

function parseTableBlockSearcher(doc: YamlBlockTableSearcherType, xpath: string): TableBlockSearcher {
  const allowedFiledNames = ['name', 'predicate', 'type', 'optionals']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const predicate = doc.predicate as TableBlockSearcherPredicate
  const predicateXPath = xpath + '/predicate'
  assertNotNull(predicate, predicateXPath)
  assertIsTableBlockSearcherPredicate(predicate, predicateXPath)

  const type = (doc.type as ScalarValueType) ?? null
  const typeXPath = xpath + '/type'
  if (type != null) {
    assertIsDullAdminScalarValueType(type, typeXPath)
  }

  const optionals = doc.optionals ?? null
  const optionalsXPath = xpath + '/optionals'
  if (optionals != null) {
    assertIsArray(optionals, optionalsXPath)
  }

  return new TableBlockSearcher(name!, predicate, type, optionals)
}

function parseTableBlockOperations(doc: YamlBlockTableOperationsType, xpath: string): TableBlockOperation[] {
  const allowedFiledNames = /^[a-zA-Z_]\w*/
  assertFieldNamesRegexp(doc, allowedFiledNames, xpath)

  const operations: TableBlockOperation[] = []
  Object.keys(doc).forEach((name) => {
    const _doc = doc[name as keyof typeof doc]!
    operations.push(parseTableBlockOperation(_doc, `${xpath}/${name}`, { name }))
  })
  return operations
}

function parseTableBlockOperation(
  doc: YamlBlockTableOperationType,
  xpath: string,
  attrs: Record<string, any>
): TableBlockOperation {
  const { name } = attrs

  const allowedFiledNames = ['authority', 'dialog', 'descriptions', 'form']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const authority = doc.authority ?? null
  const authorityXPath = xpath + '/authority'
  if (authority != null) {
    assertIsArray(authority, authorityXPath)
    authority.forEach((item, idx) => {
      assertIsString(item, authorityXPath + `[${idx}]`)
    })
  }

  let parsedDialog: Dialog | null = null
  if (doc.dialog != null) {
    parsedDialog = parseDialog(doc.dialog, xpath + '/dialog')
  } else if (doc.descriptions != null) {
    const dialog: YamlDialogType = { name, descriptions: doc.descriptions }
    parsedDialog = parseDialog(dialog, xpath)
  } else if (doc.form != null) {
    const dialog: YamlDialogType = { name, form: doc.form }
    parsedDialog = parseDialog(dialog, xpath)
  } else {
    throw new Error(`Dialog is required in \`${xpath}\`, must be one of ["descriptions", "form"]`)
  }

  return new TableBlockOperation(name, authority, parsedDialog)
}

function parseDescriptionsBlock(doc: YamlBlockType, xpath: string, attrs: Record<string, any>): DescriptionsBlock {
  const { name, authority } = attrs
  const descriptions = doc.descriptions ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(descriptions, allowedFiledNames, xpath + '/descriptions')

  const model = descriptions.items
  const modelXPath = xpath + '/descriptions/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath, { descriptions: true })

  return new DescriptionsBlock(name, authority, parsedModel)
}

function parseFormBlock(doc: YamlBlockType, xpath: string, attrs: Record<string, any>): FormBlock {
  const { name, authority } = attrs
  const form = doc.form ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(form, allowedFiledNames, xpath + '/form')

  const model = form.items
  const modelXPath = xpath + '/form/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath, { form: true })

  return new FormBlock(name, authority, parsedModel)
}

function parseEChartsBlock(_doc: YamlBlockType, _xpath: string, attrs: Record<string, any>): EChartsBlock {
  const { name, authority } = attrs
  return new EChartsBlock(name, authority)
}

function parseCustomBlock(_doc: YamlBlockType, _xpath: string, attrs: Record<string, any>): CustomBlock {
  const { name, authority } = attrs
  return new CustomBlock(name, authority)
}

function parseGrid(doc: YamlGridType, xpath: string): Grid {
  const allowedFiledNames = ['items']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const parsedItems: GridItem[] = []
  const items = doc.items
  const itemsXPath = xpath + '/items'
  assertNotNull(items, itemsXPath)
  assertIsArray(items, itemsXPath)
  items!.forEach((item, idx) => {
    const _xpath = xpath + `[${idx}]`
    const _allowedFiledNames = ['name', 'span']
    assertFieldNames(item, _allowedFiledNames, _xpath)

    const _name = item.name
    const _nameXPath = _xpath + '/name'
    assertNotNull(_name, _nameXPath)
    assertIsString(_name, _nameXPath)

    const _span = item.span ?? null
    parsedItems.push(new GridItem(_name!, _span))
  })

  return new Grid(parsedItems)
}
