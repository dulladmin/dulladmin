import Block from './view-block'
import Grid from './grid'

enum ViewPathScope {
  Collection = 'collection',
  Member = 'member'
}

class View {
  name: string
  authority: string[] | null
  blocks: Block[]
  grid: Grid | null
  pathScope: ViewPathScope

  inheritedAuthority: string[] | null
  computedGrid: Grid | null

  constructor(
    name: string,
    authority: string[] | null,
    blocks: Block[],
    pathScope: ViewPathScope | null,
    grid: Grid | null
  ) {
    this.name = name
    this.authority = authority
    this.blocks = blocks
    this.grid = grid
    this.pathScope = pathScope ?? this._defaultPathScope(this.name)
    this.inheritedAuthority = null
    this.computedGrid = null
  }

  toString(): string {
    return `#<View @name="${this.name}">`
  }

  _defaultPathScope(name: string): ViewPathScope {
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
