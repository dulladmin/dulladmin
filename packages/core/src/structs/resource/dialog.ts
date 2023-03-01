import DialogBlock from './dialog-block'

enum DialogPathScope {
  Collection = 'collection',
  Member = 'member'
}

class Dialog {
  name: string
  block: DialogBlock
  pathScope: DialogPathScope

  constructor(name: string, block: DialogBlock, pathScope: DialogPathScope | null) {
    this.name = name
    this.block = block
    this.pathScope = pathScope ?? this._pathScope(this.name)
  }

  toString(): string {
    return `#<Dialog @name="${this.name}">`
  }

  _pathScope(name: string): DialogPathScope {
    switch (name) {
      case 'index':
      case 'new':
        return DialogPathScope.Collection
      case 'show':
      case 'edit':
      case 'delete':
      default:
        return DialogPathScope.Member
    }
  }
}

export { DialogPathScope, Dialog }
export default Dialog
