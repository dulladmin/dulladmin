import { BlockType, BlockRelationshipType } from './base'

class EChartsBlock {
  type: BlockType
  authority: string[] | null

  // Data Source
  relType: BlockRelationshipType
  relName: string

  // Data Structuring
  model: null

  // Inherited Property
  inheritedAuthority: string[] | null

  constructor(relType: BlockRelationshipType, relName: string, authority: string[] | null) {
    this.type = BlockType.EChartsBlock
    this.relType = relType
    this.relName = relName
    this.authority = authority
    this.model = null
    this.inheritedAuthority = null
  }

  toString(): string {
    return `#<EChartsBlock @name="${this.relName}">`
  }
}

export { EChartsBlock }
export default EChartsBlock
