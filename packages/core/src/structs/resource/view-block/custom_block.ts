import { BlockType } from './base'

class CustomBlock {
  type: BlockType
  authority: string[] | null

  // Data Source
  name: string

  // Data Structuring
  model: null

  // Inherited Property
  inheritedAuthority: string[] | null

  constructor(name: string, authority: string[] | null) {
    this.type = BlockType.CustomBlock
    this.name = name
    this.authority = authority
    this.model = null
    this.inheritedAuthority = null
  }

  toString(): string {
    return `#<CustomBlock @name="${this.name}">`
  }
}

export { CustomBlock }
export default CustomBlock
