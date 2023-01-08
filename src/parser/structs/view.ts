import Block from './block'

enum ViewType {
  Index = 'index',
  Show = 'show',
  New = 'new',
  Edit = 'edit'
}

class View {
  type: ViewType
  blocks: Block[]

  constructor(type: ViewType, blocks: Block[]) {
    this.type = type
    this.blocks = blocks
  }
}

export { ViewType, View }
export default View
