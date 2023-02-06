import { Resource, View, TableBlock } from '@dulladmin/core'

export function extractBlockSorterInfo(_resource: Resource, _view: View, block: TableBlock): Record<string, any> {
  return block.sorters.map((sorter) => {
    return {
      name: sorter.name,
      directions: sorter.directions
    }
  })
}
