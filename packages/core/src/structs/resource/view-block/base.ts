enum BlockType {
  TableBlock = 'table',
  DescriptionsBlock = 'descriptions',
  FormBlock = 'form',
  EChartsBlock = 'echarts'
}

enum BlockRelationshipType {
  Self = 'self',
  EmbedsOne = 'embeds_one',
  EmbedsMany = 'embeds_many'
}

export { BlockType, BlockRelationshipType }
