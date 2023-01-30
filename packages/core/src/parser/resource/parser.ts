import {
  Resource,
  ViewType,
  View,
  BlockRelationshipType,
  TableBlock,
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
  assertIsDullAdminScalarValueType
} from '../assert'
import {
  YamlResourceType,
  YamlViewsType,
  YamlViewType,
  YamlBlockType,
  YamlModelAttributeType,
  YamlModelAttributeObjectAttributeType
} from './loader'

function parseResource(doc: YamlResourceType): Resource {
  if (doc.singular == null) doc.singular = false

  const allowedFiledNames = ['name', 'singular', 'views']
  assertFieldNames(doc, allowedFiledNames, '/')

  const name = doc.name
  assertNotNull(name, '/name')
  assertIsString(name, '/name')

  const views = doc.views
  assertNotNull(views, '/views')
  assertIsObject(views, '/views')
  const parsedViews = parseViews(views!, '/views')

  return new Resource(name!, doc.singular, parsedViews)
}

function parseViews(doc: YamlViewsType, xpath: string): View[] {
  const views = []
  if (doc.index != null) views.push(parseView(doc.index, xpath + '/index', ViewType.Index))
  if (doc.show != null) views.push(parseView(doc.show, xpath + '/show', ViewType.Show))
  if (doc.new != null) views.push(parseView(doc.new, xpath + '/new', ViewType.New))
  if (doc.edit != null) views.push(parseView(doc.edit, xpath + '/edit', ViewType.Edit))
  return views
}

function parseView(doc: YamlViewType, xpath: string, viewType: ViewType): View {
  const allowedFiledNames = ['blocks']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const blocks = doc.blocks
  const blocksXPath = xpath + '/blocks'
  assertNotNull(blocks, blocksXPath)
  assertIsArray(blocks, blocksXPath)
  const parsedBlocks = blocks!.map((block, idx) => parseBlock(block, blocksXPath + `[${idx}]`))

  return new View(viewType, parsedBlocks)
}

function parseBlock(doc: YamlBlockType, xpath: string): Block {
  if (doc.relationship == null) doc.relationship = 'self'
  if (doc.relationship === 'self' && doc.name == null) doc.name = 'self'

  const allowedFiledNames = ['relationship', 'name', 'table', 'descriptions', 'form']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const relType = doc.relationship as BlockRelationshipType
  const relationshipXPath = xpath + '/relationship'
  assertNotNull(relType, relationshipXPath)
  assertIsBlockRelationshipType(relType, relationshipXPath)

  const relName = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(relName, nameXPath)
  assertIsString(relName, nameXPath)

  if (doc.table != null) return parseTableBlock(doc, xpath)
  if (doc.descriptions != null) return parseDescriptionsBlock(doc, xpath)
  if (doc.form != null) return parseFormBlock(doc, xpath)
  throw new Error(`Missing BlockType in \`${xpath}\`, must be one of ["table", "descriptions", "form"]`)
}

function parseTableBlock(doc: YamlBlockType, xpath: string): TableBlock {
  const relType = doc.relationship as BlockRelationshipType
  const relName = doc.name ?? ''
  const table = doc.table ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(table, allowedFiledNames, xpath + '/table')

  const model = table.items
  const modelXPath = xpath + '/table/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath)

  return new TableBlock(relType, relName, parsedModel)
}

function parseDescriptionsBlock(doc: YamlBlockType, xpath: string): DescriptionsBlock {
  const relType = doc.relationship as BlockRelationshipType
  const relName = doc.name ?? ''
  const descriptions = doc.descriptions ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(descriptions, allowedFiledNames, xpath + '/descriptions')

  const model = descriptions.items
  const modelXPath = xpath + '/descriptions/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath)

  return new DescriptionsBlock(relType, relName, parsedModel)
}

function parseFormBlock(doc: YamlBlockType, xpath: string): FormBlock {
  const relType = doc.relationship as BlockRelationshipType
  const relName = doc.name ?? ''
  const form = doc.form ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(form, allowedFiledNames, xpath + '/form')

  const model = form.items
  const modelXPath = xpath + '/form/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath)

  return new FormBlock(relType, relName, parsedModel)
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
