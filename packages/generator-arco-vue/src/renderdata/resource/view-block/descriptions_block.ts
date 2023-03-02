/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, DescriptionsBlock } from '@dulladmin/core'
import { renderData_Model_Block } from '../model'
import { renderData_Block } from './base'

export function renderData_DescriptionsBlock(
  resource: Resource,
  view: View,
  block: DescriptionsBlock
): Record<string, any> {
  const _block = renderData_Block(resource, view, block)
  const model = renderData_Model_Block(resource, view, block)
  return { ..._block, model }
}
