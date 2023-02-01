import { TableBlockSorter } from '@dulladmin/core'

export function enhanceModelInfoWithTableSorter(model: Record<string, any>, sorters: TableBlockSorter[]): void {
  model.attributes.forEach((attr: Record<string, any>) => {
    const sorter = sorters.find((sorter) => sorter.name === attr.name)
    if (sorter != null) attr.sorter = { directions: sorter.directions }
  })
}
