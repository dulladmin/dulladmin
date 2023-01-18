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
  const blockNames = view.blocks.map((block) => block.relName)
  const dupBlockNames = blockNames.filter((name, index) => blockNames.indexOf(name) !== index)
  if (dupBlockNames.length !== 0) {
    throw Error(`View's blocks can not have duplicate name: ${JSON.stringify(dupBlockNames)}`)
  }

  const selfBlocks = view.blocks.filter((block) => block.relType === BlockRelationshipType.Self)
  if (selfBlocks.length !== 1) {
    throw Error('View must have a self-relationship Block')
  }

  switch (view.type) {
    case ViewType.Index:
      if (selfBlocks[0].type !== BlockType.TableBlock) {
        throw Error('self-relaltionship Block in IndexView must be a TableBlock')
      }
      break
    case ViewType.Show:
      if (selfBlocks[0].type !== BlockType.DescriptionsBlock) {
        throw Error('self-relaltionship Block in ShowView must be a DescriptionsBlock')
      }
      break
    case ViewType.New:
      if (selfBlocks[0].type !== BlockType.FormBlock) {
        throw Error('self-relaltionship Block in NewView must be a FormBlock')
      }
      break
    case ViewType.Edit:
      if (selfBlocks[0].type !== BlockType.FormBlock) {
        throw Error('self-relaltionship Block in EditView must be a FormBlock')
      }
      break
  }

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
    throw Error(`Block's items can not have duplicate name: ${JSON.stringify(dupAttrNames)}`)
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
    throw Error(`Object's attributes can not have duplicate name: ${JSON.stringify(dupAttrNames)}`)
  }
}

export { semanticAnalysisResource }
