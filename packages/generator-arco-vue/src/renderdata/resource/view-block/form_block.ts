/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, FormBlock } from '@dulladmin/core'
import { renderData_Model } from '../model'
import { renderData_Block } from './base'

export function renderData_FormBlock(resource: Resource, view: View, block: FormBlock): Record<string, any> {
  const _block = renderData_Block(resource, view, block)
  const model = renderData_Model(resource, view, block)
  return { ..._block, model }
}
