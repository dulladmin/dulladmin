/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View } from '@dulladmin/core'
import { toPath } from '../../naming'

export function renderData_Grid(
  _resource: Resource,
  view: View,
  blocks: Array<Record<string, any>>
): Record<string, any> {
  const grid = view.computedGrid!

  return {
    cols: JSON.stringify(grid.cols),
    items: grid.items.map((item) => {
      const itemPath = toPath(item.name)
      return {
        namePath: `dac-${itemPath}-view-grid-item`,
        span: JSON.stringify(item.span),
        block: blocks.find((block) => block.__name === item.name)
      }
    })
  }
}
