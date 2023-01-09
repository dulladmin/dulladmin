import {
  Resource,
  ViewType,
  View,
  BlockType,
  BlockRelationshipType,
  TableBlock,
  DescriptionsBlock,
  FormBlock,
  Block,
  ObjectValueType,
  ObjectValue,
  ModelAttribute,
  Model
} from './structs'

class Context {
  resource: Resource
  view: View

  constructor(resource: Resource, view: View) {
    this.resource = resource
    this.view = view
  }
}

function semanticAnalysisResource(resource: Resource): void {
  resource.views.forEach((view) => {
    const ctx = new Context(resource, view)
    semanticAnalysisView(view, ctx)
  })
}

function semanticAnalysisView(view: View, ctx: Context): void {
  const selfBlocks = view.blocks.filter((block) => block.relType === BlockRelationshipType.Self)
  if (selfBlocks.length !== 1) {
    throw Error('View must have a self-relationship Block')
  }

  switch (view.type) {
    case ViewType.Index:
      semanticAnalysisIndexView(view, ctx)
      break
    case ViewType.Show:
      semanticAnalysisShowView(view, ctx)
      break
    case ViewType.New:
      semanticAnalysisNewView(view, ctx)
      break
    case ViewType.Edit:
      semanticAnalysisEditView(view, ctx)
      break
  }
}

function semanticAnalysisIndexView(view: View, ctx: Context): void {
  if (!ctx.resource.plural) {
    throw Error('IndexView can only be used in plural resources')
  }

  view.blocks.forEach((block) => {
    semanticAnalysisBlock(block, ctx)
  })
}

function semanticAnalysisShowView(view: View, ctx: Context): void {
  view.blocks.forEach((block) => {
    semanticAnalysisBlock(block, ctx)
  })
}

function semanticAnalysisNewView(view: View, ctx: Context): void {
  view.blocks.forEach((block) => {
    semanticAnalysisBlock(block, ctx)
  })
}

function semanticAnalysisEditView(view: View, ctx: Context): void {
  view.blocks.forEach((block) => {
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
}

function semanticAnalysisDescriptionsBlock(block: DescriptionsBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx)
}

function semanticAnalysisFormBlock(block: FormBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx)
}

function semanticAnalysisModel(model: Model, ctx: Context): void {
  const attrNames = model.attributes.map((attr) => attr.name)
  const dupAttrNames = attrNames.filter((name, index) => attrNames.indexOf(name) !== index)
  if (dupAttrNames.length !== 0) {
    throw Error(`Items can not have duplicate key: ${JSON.stringify(dupAttrNames)}`)
  }

  model.attributes.forEach((attribute) => {
    semanticAnalysisModelAttribute(attribute, ctx)
  })
}

function semanticAnalysisModelAttribute(attribute: ModelAttribute, ctx: Context): void {
  if (attribute.type === ObjectValueType.Object) {
    semanticAnalysisObjectValue(attribute.object!, ctx)
  }
}

function semanticAnalysisObjectValue(object: ObjectValue, ctx: Context): void {
  const attrNames = object.attributes.map((attr) => attr.name)
  const dupAttrNames = attrNames.filter((name, index) => attrNames.indexOf(name) !== index)
  if (dupAttrNames.length !== 0) {
    throw Error(`Attributes can not have duplicate key: ${JSON.stringify(dupAttrNames)}`)
  }
}

export { semanticAnalysisResource }
