import DialogBlock from './dialog-block'

enum DialogType {
  Show = 'show',
  New = 'new',
  Edit = 'edit',
  Delete = 'delete'
}

class Dialog {
  type: DialogType
  authority: string[] | null
  block: DialogBlock

  constructor(type: DialogType, authority: string[] | null, block: DialogBlock) {
    this.type = type
    this.authority = authority
    this.block = block
  }

  toString(): string {
    let klass = `${this.type}Dialog`
    klass = klass.charAt(0).toUpperCase() + klass.slice(1)
    return `#<${klass}>`
  }
}

export { DialogType, Dialog }
export default Dialog
