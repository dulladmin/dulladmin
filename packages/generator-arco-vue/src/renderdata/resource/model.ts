/* eslint-disable @typescript-eslint/naming-convention */
import { Resource, View, Block, Dialog, Model } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../naming'
import { toJsonType } from '../base'

export function renderData_Model_Block(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const i18nKeyPrefix = `${resourcePath}--${viewPath}.${blockPath}-block.model.attributes`
  return renderData_Model(block.model as Model, { i18nKeyPrefix })
}

export function renderData_Model_Dialog(
  resource: Resource,
  view: View,
  block: Block,
  dialog: Dialog
): Record<string, any> {
  const resourcePath = toPath(resource.name)
  const viewPath = toPath(view.name)
  const blockPath = toPath(block.relName)
  const dialogPath = toPath(dialog.name)
  const i18nKeyPrefix = `${resourcePath}--${viewPath}.${blockPath}-block.${dialogPath}-dialog.model.attributes`
  return renderData_Model(dialog.block.model, { i18nKeyPrefix })
}

function renderData_Model(model: Model, attrs: Record<string, any>): Record<string, any> {
  const i18nKeyPrefix: string = attrs.i18nKeyPrefix
  return {
    attributes: model.attributes.map((attr) => {
      return {
        name: attr.name,
        type: attr.type,
        jsonType: toJsonType(attr.type),
        optionals: attr.optionals?.map((rawOpt) => {
          const opt = String(rawOpt)
          return {
            name: opt,
            i18nKey: `${i18nKeyPrefix}.${attr.name}.optionals.${opt}`,
            i18nValue: toI18nMessage(opt)
          }
        }),
        collection: attr.collection,
        object:
          attr.object == null
            ? null
            : {
                attributes: attr.object.attributes.map((objAttr) => {
                  return {
                    name: objAttr.name,
                    type: objAttr.type,
                    jsonType: toJsonType(objAttr.type),
                    optionals: attr.optionals?.map((rawOpt) => {
                      const opt = String(rawOpt)
                      return {
                        name: opt,
                        i18nKey: `${i18nKeyPrefix}.${attr.name}.${objAttr.name}.optionals.${opt}`,
                        i18nValue: toI18nMessage(opt)
                      }
                    }),
                    collection: objAttr.collection,
                    i18nKey: `${i18nKeyPrefix}.${attr.name}.${objAttr.name}`,
                    i18nValue: toI18nMessage(objAttr.name)
                  }
                })
              },
        hidden: attr.hidden ?? false,
        disabled: attr.disabled ?? false,
        i18nKey: `${i18nKeyPrefix}.${attr.name}`,
        i18nValue: toI18nMessage(attr.name)
      }
    })
  }
}
