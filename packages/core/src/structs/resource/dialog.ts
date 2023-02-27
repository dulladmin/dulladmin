import DialogBlock from './dialog-block'

class Dialog {
  name: string
  block: DialogBlock

  constructor(name: string, block: DialogBlock) {
    this.name = name
    this.block = block
  }

  toString(): string {
    return `#<Dialog @name="${this.name}">`
  }
}

export { Dialog }
export default Dialog
