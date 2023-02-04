import {
  Resource,
  ViewType,
  View,
  BlockRelationshipType,
  TableBlock,
  TableBlockSorter,
  TableBlockSorterDirection,
  TableBlockSearcher,
  TableBlockSearcherPredicate,
  DescriptionsBlock,
  FormBlock,
  Block,
  ScalarValueType,
  ObjectValueType,
  ObjectValueAttribute,
  ObjectValue,
  ModelAttribute,
  Model
} from '../../structs'
import {
  assertFieldNames,
  assertNotNull,
  assertIsArray,
  assertIsObject,
  assertIsString,
  assertIsBlockRelationshipType,
  assertIsDullAdminValueType,
  assertIsDullAdminScalarValueType,
  assertIsTableBlockSorterDirection,
  assertIsTableBlockSearcherPredicate
} from '../assert'
import {
  YamlResourceType,
  YamlViewsType,
  YamlViewType,
  YamlBlockType,
  YamlBlockTableSorterType,
  YamlBlockTableSearcherType,
  YamlModelAttributeType,
  YamlModelAttributeObjectAttributeType
} from './loader'

function parseResource(doc: YamlResourceType): Resource {
  if (doc.singular == null) doc.singular = false

  const allowedFiledNames = ['name', 'singular', 'authority', 'views']
  assertFieldNames(doc, allowedFiledNames, '/')

  const name = doc.name
  const nameXPath = '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const authority = doc.authority ?? null
  const authorityXPath = '/authority'
  if (authority != null) {
    assertIsArray(authority, authorityXPath)
    authority.forEach((item, idx) => {
      assertIsString(item, authorityXPath + `[${idx}]`)
    })
  }

  const views = doc.views
  const viewsXPath = '/views'
  assertNotNull(views, viewsXPath)
  assertIsObject(views, viewsXPath)
  const parsedViews = parseViews(views!, viewsXPath)

  return new Resource(name!, doc.singular, authority, parsedViews)
}

function parseViews(doc: YamlViewsType, xpath: string): View[] {
  const allowedFiledNames = ['index', 'show', 'new', 'edit']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const views = []
  if (doc.index != null) views.push(parseView(doc.index, xpath + '/index', ViewType.Index))
  if (doc.show != null) views.push(parseView(doc.show, xpath + '/show', ViewType.Show))
  if (doc.new != null) views.push(parseView(doc.new, xpath + '/new', ViewType.New))
  if (doc.edit != null) views.push(parseView(doc.edit, xpath + '/edit', ViewType.Edit))
  return views
}

function parseView(doc: YamlViewType, xpath: string, viewType: ViewType): View {
  const allowedFiledNames = ['authority', 'blocks']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const authority = doc.authority ?? null
  const authorityXPath = xpath + '/authority'
  if (authority != null) {
    assertIsArray(authority, authorityXPath)
    authority.forEach((item, idx) => {
      assertIsString(item, authorityXPath + `[${idx}]`)
    })
  }

  const blocks = doc.blocks
  const blocksXPath = xpath + '/blocks'
  assertNotNull(blocks, blocksXPath)
  assertIsArray(blocks, blocksXPath)
  const parsedBlocks = blocks!.map((block, idx) => parseBlock(block, blocksXPath + `[${idx}]`))

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
  throw new Error(`BlockType is required in \`${xpath}\`, must be one of ["table", "descriptions", "form"]`)
}

function parseTableBlock(doc: YamlBlockType, xpath: string, attrs: Record<string, any>): TableBlock {
  const { relType, relName, authority } = attrs
  const table = doc.table ?? {}

  const allowedFiledNames = ['items', 'sorters', 'searchers']
  assertFieldNames(table, allowedFiledNames, xpath + '/table')

  const model = table.items
  const modelXPath = xpath + '/table/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath)

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

  return new TableBlock(relType, relName, authority, parsedModel, parsedSorters, parsedSearchers)
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
  if (type != null) assertIsDullAdminScalarValueType(type, typeXPath)

  const optionals = doc.optionals ?? null
  const optionalsXPath = xpath + '/optionals'
  if (optionals != null) assertIsArray(optionals, optionalsXPath)

  return new TableBlockSearcher(name!, predicate, type, optionals)
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
  const parsedModel = parseModel(model!, modelXPath)

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
  const parsedModel = parseModel(model!, modelXPath)

  return new FormBlock(relType, relName, authority, parsedModel)
}

function parseModel(doc: YamlModelAttributeType[], xpath: string): Model {
  const parsedAttributes = doc.map((item, idx) => parseModelAttribute(item, xpath + `[${idx}]`))
  return new Model(parsedAttributes)
}

function parseModelAttribute(doc: YamlModelAttributeType, xpath: string): ModelAttribute {
  const allowedFiledNames = ['name', 'type', 'attributes']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  let type = doc.type
  let collection = false
  const typeXPath = xpath + '/type'
  assertNotNull(type, typeXPath)
  assertIsString(type, typeXPath)
  assertIsDullAdminValueType(type!.replace('[]', ''), typeXPath)
  if (type!.endsWith('[]')) {
    type = type!.replace('[]', '')
    collection = true
  }

  let object = null
  if (type === ObjectValueType.Object) {
    const attributes = doc.attributes
    const attributesXPath = xpath + '/attributes'
    assertNotNull(attributes, attributesXPath)
    assertIsArray(attributes, attributesXPath)
    object = parseObject(attributes!, attributesXPath)
  }

  return new ModelAttribute(name!, type as ScalarValueType | ObjectValueType, collection, object)
}

function parseObject(doc: YamlModelAttributeObjectAttributeType[], xpath: string): ObjectValue {
  const parsedAttributes = doc.map((item, idx) => parseObjectAttribute(item, xpath + `[${idx}]`))
  return new ObjectValue(parsedAttributes)
}

function parseObjectAttribute(doc: YamlModelAttributeObjectAttributeType, xpath: string): ObjectValueAttribute {
  const allowedFiledNames = ['name', 'type']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  let type = doc.type
  let collection = false
  const typeXPath = xpath + '/type'
  assertNotNull(type, typeXPath)
  assertIsString(type, typeXPath)
  assertIsDullAdminScalarValueType(type!.replace('[]', ''), typeXPath)
  if (type!.endsWith('[]')) {
    type = type!.replace('[]', '')
    collection = true
  }

  return new ObjectValueAttribute(name!, type as ScalarValueType, collection)
}

export { parseResource }
