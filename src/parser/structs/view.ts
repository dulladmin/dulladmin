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

  constructor(type: ViewType) {
    this.type = type
    this.blocks = []
  }
}

export { ViewType, View }
export default View
