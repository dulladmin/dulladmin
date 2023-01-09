import {
  assertNotNull,
  assertIsArray,
  assertIsObject,
  assertIsString,
  assertIsBlockRelationshipType,
  assertIsDullAdminValueType,
  assertIsDullAdminScalarValueType
} from './assert'
import {
  YamlResourceType,
  YamlViewsType,
  YamlViewType,
  YamlBlockType,
  YamlBlockFormType,
  YamlBlockDescriptionsType,
  YamlBlockTableType,
  YamlModelAttributeType,
  YamlModelAttributeObjectAttributeType
} from './loader'
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
} from './structs'

function parseResource(doc: YamlResourceType): Resource {
  const name = doc.name
  assertNotNull(name, '/name')
  assertIsString(name, '/name')

  const views = doc.views
  assertNotNull(views, '/views')
  assertIsObject(views, '/views')
  const parsedViews = parseViews(views!, '/views')

  return new Resource(name!, parsedViews)
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
  const blocks = doc.blocks
  const blocksXPath = xpath + '/blocks'
  assertNotNull(blocks, blocksXPath)
  assertIsArray(blocks, blocksXPath)
  const parsedBlocks = blocks!.map((block, idx) => parseBlock(block, blocksXPath + `[${idx}]`))

  return new View(viewType, parsedBlocks)
}

function parseBlock(doc: YamlBlockType, xpath: string): Block {
  const relType = doc.relationship as BlockRelationshipType
  const relationshipXPath = xpath + '/relationship'
  assertNotNull(relType, relationshipXPath)
  assertIsBlockRelationshipType(relType, relationshipXPath)

  if (doc.table != null) return parseTableBlock(doc, xpath)
  if (doc.descriptions != null) return parseDescriptionsBlock(doc, xpath)
  if (doc.form != null) return parseFormBlock(doc, xpath)
  throw new Error('Block must be one of ["table", "descriptions", "form"]')
}

function parseTableBlock(doc: YamlBlockType, xpath: string): TableBlock {
  const relType = doc.relationship as BlockRelationshipType
  const relName = doc.name ?? ''
  const table = doc.table as YamlBlockTableType

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
  const descriptions = doc.descriptions as YamlBlockDescriptionsType

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
  const form = doc.form as YamlBlockFormType

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

  let object
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
