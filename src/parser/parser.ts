import {
  YamlResourceType,
  YamlViewsType,
  YamlViewType,
  YamlBlockType,
  YamlBlockFormType,
  YamlBlockDescriptionsType,
  YamlBlockTableType,
  YamlModelAttributeType,
  load,
  assertNotNull,
  assertIsArray,
  assertIsBlockRelationshipType
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
  ModelAttribute,
  Model
} from './structs'

class ParseContext {
  resource: Resource
  view?: View

  constructor(resource: Resource) {
    this.resource = resource
  }

  get blockXPath(): string {
    return `views.${this.view!.type}.blocks[${this.view!.blocks.length}]`
  }
}

function parse(str: string): Resource {
  return parseResource(load(str))
}

function parseResource(doc: YamlResourceType): Resource {
  assertNotNull(doc.name, 'name')
  assertNotNull(doc.views, 'views')

  const resource = new Resource(doc.name!)
  const ctx = new ParseContext(resource)
  resource.views = parseViews(doc.views!, ctx)
  return resource
}

function parseViews(doc: YamlViewsType, ctx: ParseContext): View[] {
  const views = []
  if (doc.index != null) views.push(parseViewIndex(doc.index, ctx))
  if (doc.show != null) views.push(parseViewShow(doc.show, ctx))
  if (doc.new != null) views.push(parseViewNew(doc.new, ctx))
  if (doc.edit != null) views.push(parseViewEdit(doc.edit, ctx))
  return views
}

function parseViewIndex(doc: YamlViewType, ctx: ParseContext): View {
  const view = new View(ViewType.Index)
  ctx.view = view

  assertNotNull(doc.blocks, 'views.index.blocks')
  assertIsArray(doc.blocks, 'views.index.blocks')
  doc.blocks!.forEach((block) => view.blocks.push(parseBlock(block, ctx)))

  ctx.view = undefined
  return view
}

function parseViewShow(doc: YamlViewType, ctx: ParseContext): View {
  const view = new View(ViewType.Show)
  ctx.view = view

  assertNotNull(doc.blocks, 'views.show.blocks')
  assertIsArray(doc.blocks, 'views.show.blocks')
  doc.blocks!.forEach((block) => view.blocks.push(parseBlock(block, ctx)))

  ctx.view = undefined
  return view
}

function parseViewNew(doc: YamlViewType, ctx: ParseContext): View {
  const view = new View(ViewType.New)
  ctx.view = view

  assertNotNull(doc.blocks, 'views.new.blocks')
  assertIsArray(doc.blocks, 'views.new.blocks')
  doc.blocks!.forEach((block) => view.blocks.push(parseBlock(block, ctx)))

  ctx.view = undefined
  return view
}

function parseViewEdit(doc: YamlViewType, ctx: ParseContext): View {
  const view = new View(ViewType.Edit)
  ctx.view = view

  assertNotNull(doc.blocks, 'views.edit.blocks')
  assertIsArray(doc.blocks, 'views.edit.blocks')
  doc.blocks!.forEach((block) => view.blocks.push(parseBlock(block, ctx)))

  ctx.view = undefined
  return view
}

function parseBlock(doc: YamlBlockType, ctx: ParseContext): Block {
  let relType = doc.relationship as BlockRelationshipType
  if (relType == null) {
    relType = BlockRelationshipType.Self
  } else {
    assertIsBlockRelationshipType(relType, ctx.blockXPath + '.relationship')
  }

  if (doc.table != null) return parseTableBlock(doc, ctx)
  if (doc.descriptions != null) return parseDescriptionsBlock(doc, ctx)
  if (doc.form != null) return parseFormBlock(doc, ctx)
  throw new Error('Block must be one of ["table", "descriptions", "form"]')
}

function parseTableBlock(doc: YamlBlockType, ctx: ParseContext): TableBlock {
  const relType = doc.relationship as BlockRelationshipType
  const relName = doc.name ?? ''
  const table = doc.table as YamlBlockTableType

  const tableXPath = ctx.blockXPath + '.table'
  assertNotNull(table.items, tableXPath + '.items')
  assertIsArray(table.items, tableXPath + '.items')
  const model = parseModel(table.items!, ctx)

  return new TableBlock(relType, relName, model)
}

function parseDescriptionsBlock(doc: YamlBlockType, ctx: ParseContext): DescriptionsBlock {
  const relType = doc.relationship as BlockRelationshipType
  const relName = doc.name ?? ''
  const descriptions = doc.descriptions as YamlBlockDescriptionsType

  const descriptionsXPath = ctx.blockXPath + '.descriptions'
  assertNotNull(descriptions.items, descriptionsXPath + '.items')
  assertIsArray(descriptions.items, descriptionsXPath + '.items')
  const model = parseModel(descriptions.items!, ctx)

  return new DescriptionsBlock(relType, relName, model)
}

function parseFormBlock(doc: YamlBlockType, ctx: ParseContext): FormBlock {
  const relType = doc.relationship as BlockRelationshipType
  const relName = doc.name ?? ''
  const form = doc.form as YamlBlockFormType

  const formXPath = ctx.blockXPath + '.form'
  assertNotNull(form.items, formXPath + '.items')
  assertIsArray(form.items, formXPath + '.items')
  const model = parseModel(form.items!, ctx)

  return new FormBlock(relType, relName, model)
}

function parseModel(doc: YamlModelAttributeType[], ctx: ParseContext): Model {
  const model = new Model()
  doc.forEach((item) => model.attributes.push(parseModelAttribute(item, ctx)))
  return model
}

function parseModelAttribute(doc: YamlModelAttributeType, ctx: ParseContext): ModelAttribute {
  return new ModelAttribute('')
}

export { parse }
