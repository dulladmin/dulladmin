import * as yaml from 'js-yaml'
import {
  Resource,
  ViewType,
  View,
  BlockRelationshipType,
  TableBlock,
  DescriptionsBlock,
  FormBlock,
  Block
} from './structs'

interface YamlBlockType {
  relationship?: string
  name?: string
  table?: any
  descriptions?: any
  form?: any
}
interface YamlViewType {
  blocks?: YamlBlockType[]
}
interface YamlViewsType {
  index?: YamlViewType
  show?: YamlViewType
  new?: YamlViewType
  edit?: YamlViewType
}
interface YamlResourceType {
  name?: string
  views?: YamlViewsType
}
interface ParseContext {
  resource: Resource
  view?: View
}

function parse(str: string): Resource {
  const doc = yaml.load(str) as YamlResourceType

  if (doc.name == null) throw new Error('Field `name` is required')
  if (doc.views == null) throw new Error('Field `views` is required')

  const resource = new Resource(doc.name)
  const ctx: ParseContext = { resource }
  resource.views = parseViews(doc.views, ctx)

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

  if (doc.blocks == null) {
    throw new Error('Field `views.index.blocks` is required')
  }
  if (!Array.isArray(doc.blocks)) {
    throw new Error('Field `views.index.blocks` must be an array')
  }
  doc.blocks.map((block) => parseBlock(block, ctx))

  ctx.view = undefined
  return view
}

function parseViewShow(doc: YamlViewType, ctx: ParseContext): View {
  const view = new View(ViewType.Show)
  ctx.view = view

  if (doc.blocks == null) {
    throw new Error('Field `views.show.blocks` is required')
  }
  if (!Array.isArray(doc.blocks)) {
    throw new Error('Field `views.show.blocks` must be an array')
  }
  doc.blocks.map((block) => parseBlock(block, ctx))

  ctx.view = undefined
  return view
}

function parseViewNew(doc: YamlViewType, ctx: ParseContext): View {
  const view = new View(ViewType.New)
  ctx.view = view

  if (doc.blocks == null) {
    throw new Error('Field `views.new.blocks` is required')
  }
  if (!Array.isArray(doc.blocks)) {
    throw new Error('Field `views.new.blocks` must be an array')
  }
  doc.blocks.map((block) => parseBlock(block, ctx))

  ctx.view = undefined
  return view
}

function parseViewEdit(doc: YamlViewType, ctx: ParseContext): View {
  const view = new View(ViewType.Edit)
  ctx.view = view

  if (doc.blocks == null) {
    throw new Error('Field `views.edit.blocks` is required')
  }
  if (!Array.isArray(doc.blocks)) {
    throw new Error('Field `views.edit.blocks` must be an array')
  }
  doc.blocks.map((block) => parseBlock(block, ctx))

  ctx.view = undefined
  return view
}

function parseBlock(doc: YamlBlockType, ctx: ParseContext): Block {
  let relType = doc.relationship as BlockRelationshipType
  if (relType != null) {
    if (!Object.values(BlockRelationshipType).includes(relType)) {
      const fieldStr = `views.${ctx.resource.name}.blocks[].relationship`
      throw new Error(
        `Field \`${fieldStr}\` must be one of ["self", "has_one", "has_many"]}`
      )
    }
  } else {
    relType = BlockRelationshipType.Self
  }

  const relName = doc.name ?? ''
  let block!: Block
  if (doc.table != null) block = new TableBlock(relType, relName)
  if (doc.descriptions != null) block = new DescriptionsBlock(relType, relName)
  if (doc.form != null) block = new FormBlock(relType, relName)
  if (block == null) {
    throw new Error('Block must be one of ["table", "descriptions", "form"]')
  }
  return block
}

export { parse }
