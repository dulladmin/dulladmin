import { BlockType } from './base'

class EChartsBlock {
  type: BlockType
  authority: string[] | null

  // Data Source
  name: string

  // Data Structuring
  model: null

  // Inherited Property
  inheritedAuthority: string[] | null

  constructor(name: string, authority: string[] | null) {
    this.type = BlockType.EChartsBlock
    this.name = name
    this.authority = authority
    this.model = null
    this.inheritedAuthority = null
  }

  toString(): string {
    return `#<EChartsBlock @name="${this.name}">`
  }
}

export { EChartsBlock }
export default EChartsBlock
