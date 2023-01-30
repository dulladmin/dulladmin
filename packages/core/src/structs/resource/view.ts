import Block from './block'

enum ViewType {
  Index = 'index',
  Show = 'show',
  New = 'new',
  Edit = 'edit'
}

class View {
  type: ViewType
  authority: string[] | null
  blocks: Block[]

  constructor(type: ViewType, authority: string[] | null, blocks: Block[]) {
    this.type = type
    this.authority = authority
    this.blocks = blocks
  }
}

export { ViewType, View }
export default View
