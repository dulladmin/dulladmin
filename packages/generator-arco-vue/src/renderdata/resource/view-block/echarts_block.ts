/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, EChartsBlock } from '@dulladmin/core'
import { renderData_Block } from './base'

export function renderData_EChartsBlock(resource: Resource, view: View, block: EChartsBlock): Record<string, any> {
  const _block = renderData_Block(resource, view, block)
  return { ..._block }
}
