import {
  Resource,
  ViewType,
  View,
  BlockType,
  BlockRelationshipType,
  TableBlock,
  TableBlockSorter,
  TableBlockSearcher,
  DescriptionsBlock,
  FormBlock,
  Block,
  ModelAttribute,
  Model
} from '../../structs'
import { isDullAdminScalarValueType, isDullAdminObjectValueType } from '../assert'

class Context {
  resource: Resource
  view: View
  block: Block | null

  constructor(resource: Resource, view: View) {
    this.resource = resource
    this.view = view
    this.block = null
  }
}

function semanticAnalysisResource(resource: Resource): void {
  resource.views.forEach((view) => {
    if (resource.singular) {
      if (view.type === ViewType.Index) {
        throw Error(`${resource.toString()} is a singular resource, can not have IndexView`)
      }
    }

    const ctx = new Context(resource, view)
    semanticAnalysisView(view, ctx)
  })
}

function semanticAnalysisView(view: View, ctx: Context): void {
  const blockNames = view.blocks.map((block) => block.relName)
  const dupBlockNames = blockNames.filter((name, index) => blockNames.indexOf(name) !== index)
  if (dupBlockNames.length !== 0) {
    throw Error(`${view.toString()}'s blocks can not have duplicate name: ${JSON.stringify(dupBlockNames)}`)
  }

  const selfBlocks = view.blocks.filter((block) => block.relType === BlockRelationshipType.Self)
  if (selfBlocks.length !== 1) {
    throw Error(`${view.toString()} must have a self-relationship Block`)
  }

  switch (view.type) {
    case ViewType.Index:
      if (selfBlocks[0].type !== BlockType.TableBlock) {
        throw Error(`${view.toString()}'s self-relaltionship Block must be a TableBlock`)
      }
      break
    case ViewType.Show:
      if (selfBlocks[0].type !== BlockType.DescriptionsBlock) {
        throw Error(`${view.toString()}'s self-relaltionship Block must be a DescriptionsBlock`)
      }
      break
    case ViewType.New:
    case ViewType.Edit:
    case ViewType.Delete:
      if (selfBlocks[0].type !== BlockType.FormBlock) {
        throw Error(`${view.toString()}'s self-relaltionship Block must be a FormBlock`)
      }
      break
  }

  view.blocks.forEach((block) => {
    ctx.block = block
    semanticAnalysisBlock(block, ctx)
  })
}

function semanticAnalysisBlock(block: Block, ctx: Context): void {
  switch (block.type) {
    case BlockType.TableBlock:
      semanticAnalysisTableBlock(block as TableBlock, ctx)
      break
    case BlockType.DescriptionsBlock:
      semanticAnalysisDescriptionsBlock(block as DescriptionsBlock, ctx)
      break
    case BlockType.FormBlock:
      semanticAnalysisFormBlock(block as FormBlock, ctx)
      break
  }
}

function semanticAnalysisTableBlock(block: TableBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx)
  semanticAnalysisTableSorter(block.sorters, ctx)
  semanticAnalysisTableSearcher(block.searchers, ctx)
}

function semanticAnalysisTableSorter(sorters: TableBlockSorter[], ctx: Context): void {
  const block = ctx.block as TableBlock

  const sorterNames = sorters.map((sorter) => sorter.name)
  const dupSorterNames = sorterNames.filter((name, index) => sorterNames.indexOf(name) !== index)
  if (dupSorterNames.length !== 0) {
    throw Error(`${block.toString()}'s sorters can not have duplicate name: ${JSON.stringify(dupSorterNames)}`)
  }

  sorters.forEach((sorter) => {
    const attr = block.model.attributes.find((attr) => attr.name === sorter.name)
    if (attr == null) {
      throw Error(`${sorter.toString()}'s name must be defined in items`)
    }
  })
}

function semanticAnalysisTableSearcher(searchers: TableBlockSearcher[], ctx: Context): void {
  const block = ctx.block as TableBlock

  const searcherNames = searchers.map((searcher) => searcher.name + '_' + searcher.predicate)
  const dupSearcherNames = searcherNames.filter((name, index) => searcherNames.indexOf(name) !== index)
  if (dupSearcherNames.length !== 0) {
    throw Error(
      `${block.toString()}'s searchers can not have duplicate (name, predicate): ${JSON.stringify(dupSearcherNames)}`
    )
  }

  searchers.forEach((searcher) => {
    if (searcher.type != null) {
      return
    }

    const attr = block.model.attributes.find((attr) => attr.name === searcher.name)
    if (attr == null) {
      throw Error(`${searcher.toString()}'s name must be defined in items`)
    }
    if (!isDullAdminScalarValueType(attr.type)) {
      throw Error(`${searcher.toString()}'s associated item's type must be a scalar value type`)
    }
  })
}

function semanticAnalysisDescriptionsBlock(block: DescriptionsBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx)
}

function semanticAnalysisFormBlock(block: FormBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx)
}

function semanticAnalysisModel(model: Model, ctx: Context): void {
  const block = ctx.block as Block

  const attrNames = model.attributes.map((attr) => attr.name)
  const dupAttrNames = attrNames.filter((name, index) => attrNames.indexOf(name) !== index)
  if (dupAttrNames.length !== 0) {
    throw Error(`${block.toString()}'s items can not have duplicate name: ${JSON.stringify(dupAttrNames)}`)
  }

  model.attributes.forEach((attribute) => {
    semanticAnalysisModelAttribute(attribute, ctx)
  })
}

function semanticAnalysisModelAttribute(attribute: ModelAttribute, _ctx: Context): void {
  if (isDullAdminObjectValueType(attribute.type)) {
    if (attribute.optionals != null) {
      throw Error(`${attribute.toString()} can not have \`optionals\` when using object value type`)
    }

    const object = attribute.object!
    const attrNames = object.attributes.map((attr) => attr.name)
    const dupAttrNames = attrNames.filter((name, index) => attrNames.indexOf(name) !== index)
    if (dupAttrNames.length !== 0) {
      throw Error(`${attribute.toString()}'s attributes can not have duplicate name: ${JSON.stringify(dupAttrNames)}`)
    }
  }
}

export { semanticAnalysisResource }
