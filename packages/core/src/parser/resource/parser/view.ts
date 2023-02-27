import {
  ViewType,
  View,
  BlockRelationshipType,
  TableBlock,
  TableBlockSorter,
  TableBlockSorterDirection,
  TableBlockSearcher,
  TableBlockSearcherPredicate,
  TableBlockPagination,
  TableBlockOperationType,
  TableBlockOperation,
  DescriptionsBlock,
  FormBlock,
  Block,
  Dialog,
  ScalarValueType
} from '../../../structs'
import {
  assertFieldNames,
  assertNotNull,
  assertIsArray,
  assertIsObject,
  assertIsString,
  assertIsBlockRelationshipType,
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
  YamlDialogType
} from '../loader'
import { parseDialog } from './dialog'
import { parseModel } from './model'

export function parseView(doc: YamlViewType, xpath: string, viewType: ViewType): View {
  const allowedFiledNames = ['authority', 'blocks', 'table', 'descriptions', 'form']
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

  return new View(viewType, authority, parsedBlocks)
}

function parseBlock(doc: YamlBlockType, xpath: string): Block {
  if (doc.relationship == null) doc.relationship = 'self'
  if (doc.relationship === 'self' && doc.name == null) doc.name = 'self'

  const allowedFiledNames = ['relationship', 'name', 'authority', 'table', 'descriptions', 'form']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const relType = doc.relationship as BlockRelationshipType
  const relationshipXPath = xpath + '/relationship'
  assertNotNull(relType, relationshipXPath)
  assertIsBlockRelationshipType(relType, relationshipXPath)

  const relName = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(relName, nameXPath)
  assertIsString(relName, nameXPath)

  const authority = doc.authority ?? null
  const authorityXPath = xpath + '/authority'
  if (authority != null) {
    assertIsArray(authority, authorityXPath)
    authority.forEach((item, idx) => {
      assertIsString(item, authorityXPath + `[${idx}]`)
    })
  }

  const attrs = { relType, relName, authority }
  if (doc.table != null) return parseTableBlock(doc, xpath, attrs)
  if (doc.descriptions != null) return parseDescriptionsBlock(doc, xpath, attrs)
  if (doc.form != null) return parseFormBlock(doc, xpath, attrs)
  throw new Error(`Block is required in \`${xpath}\`, must be one of ["table", "descriptions", "form"]`)
}

function parseTableBlock(doc: YamlBlockType, xpath: string, attrs: Record<string, any>): TableBlock {
  const { relType, relName, authority } = attrs
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
    relType,
    relName,
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
  const allowedFiledNames = ['show', 'new', 'edit', 'delete']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const operations = []
  if (doc.show != null) {
    operations.push(parseTableBlockOperation(doc.show, xpath + '/show', TableBlockOperationType.Show))
  }
  if (doc.new != null) {
    operations.push(parseTableBlockOperation(doc.new, xpath + '/new', TableBlockOperationType.New))
  }
  if (doc.edit != null) {
    operations.push(parseTableBlockOperation(doc.edit, xpath + '/edit', TableBlockOperationType.Edit))
  }
  if (doc.delete != null) {
    operations.push(parseTableBlockOperation(doc.delete, xpath + '/delete', TableBlockOperationType.Delete))
  }
  return operations
}

function parseTableBlockOperation(
  doc: YamlBlockTableOperationType,
  xpath: string,
  type: TableBlockOperationType
): TableBlockOperation {
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
    const dialog: YamlDialogType = { name: type, descriptions: doc.descriptions }
    parsedDialog = parseDialog(dialog, xpath)
  } else if (doc.form != null) {
    const dialog: YamlDialogType = { name: type, form: doc.form }
    parsedDialog = parseDialog(dialog, xpath)
  } else {
    throw new Error(`Dialog is required in \`${xpath}\`, must be one of ["descriptions", "form"]`)
  }

  return new TableBlockOperation(type, authority, parsedDialog)
}

function parseDescriptionsBlock(doc: YamlBlockType, xpath: string, attrs: Record<string, any>): DescriptionsBlock {
  const { relType, relName, authority } = attrs
  const descriptions = doc.descriptions ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(descriptions, allowedFiledNames, xpath + '/descriptions')

  const model = descriptions.items
  const modelXPath = xpath + '/descriptions/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath, { descriptions: true })

  return new DescriptionsBlock(relType, relName, authority, parsedModel)
}

function parseFormBlock(doc: YamlBlockType, xpath: string, attrs: Record<string, any>): FormBlock {
  const { relType, relName, authority } = attrs
  const form = doc.form ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(form, allowedFiledNames, xpath + '/form')

  const model = form.items
  const modelXPath = xpath + '/form/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath, { form: true })

  return new FormBlock(relType, relName, authority, parsedModel)
}
