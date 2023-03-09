/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, CustomBlock } from '@dulladmin/core'
import { renderData_Block } from './base'

export function renderData_CustomBlock(resource: Resource, view: View, block: CustomBlock): Record<string, any> {
  const _block = renderData_Block(resource, view, block)
  return { ..._block }
}
