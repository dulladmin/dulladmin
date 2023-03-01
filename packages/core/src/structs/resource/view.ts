import Block from './view-block'

enum ViewPathScope {
  Collection = 'collection',
  Member = 'member'
}

class View {
  name: string
  authority: string[] | null
  blocks: Block[]
  pathScope: ViewPathScope

  inheritedAuthority: string[] | null

  constructor(name: string, authority: string[] | null, blocks: Block[], pathScope: ViewPathScope | null) {
    this.name = name
    this.authority = authority
    this.blocks = blocks
    this.pathScope = pathScope ?? this._pathScope(this.name)
    this.inheritedAuthority = null
  }

  toString(): string {
    return `#<View @name="${this.name}">`
  }

  _pathScope(name: string): ViewPathScope {
    switch (name) {
      case 'index':
      case 'new':
        return ViewPathScope.Collection
      case 'show':
      case 'edit':
      case 'delete':
      default:
        return ViewPathScope.Member
    }
  }
}

export { ViewPathScope, View }
export default View
