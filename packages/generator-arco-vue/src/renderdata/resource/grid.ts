/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View } from '@dulladmin/core'

export function renderData_Grid(
  _resource: Resource,
  view: View,
  blocks: Array<Record<string, any>>
): Record<string, any> {
  const grid = view.computedGrid!
  return {
    cols: grid.cols,
    items: grid.items.map((item) => {
      return {
        span: item.span,
        block: blocks.find((block) => block.__name === item.name)
      }
    })
  }
}
