/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, Block, Dialog } from '@dulladmin/core'
import { renderData_Model } from '../model'
import { renderData_Dialog } from './base'

export function renderData_FormDialog(
  resource: Resource,
  view: View,
  block: Block,
  dialog: Dialog
): Record<string, any> {
  const _dialog = renderData_Dialog(resource, view, block, dialog)
  const model = renderData_Model(resource, view, block)
  return { ..._dialog, model }
}
