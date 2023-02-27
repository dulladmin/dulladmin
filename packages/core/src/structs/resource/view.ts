import Block from './view-block'

enum ViewType {
  Index = 'index',
  Show = 'show',
  New = 'new',
  Edit = 'edit',
  Delete = 'delete'
}

class View {
  type: ViewType
  authority: string[] | null
  blocks: Block[]

  inheritedAuthority: string[] | null

  constructor(type: ViewType, authority: string[] | null, blocks: Block[]) {
    this.type = type
    this.authority = authority
    this.blocks = blocks
    this.inheritedAuthority = null
  }

  toString(): string {
    let klass = `${this.type}View`
    klass = klass.charAt(0).toUpperCase() + klass.slice(1)
    return `#<${klass}>`
  }
}

export { ViewType, View }
export default View
