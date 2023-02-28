import { Block, DialogBlock, ModelAttribute, Model } from '../../../structs'
import { isDullAdminObjectValueType } from '../../assert'
import { Context } from './base'

export function semanticAnalysisModel(model: Model, ctx: Context, container: Block | DialogBlock): void {
  const attrNames = model.attributes.map((attr) => attr.name)
  const dupAttrNames = attrNames.filter((name, index) => attrNames.indexOf(name) !== index)
  if (dupAttrNames.length !== 0) {
    throw Error(`${container.toString()}'s items can not have duplicate name: ${JSON.stringify(dupAttrNames)}`)
  }

  model.attributes.forEach((attribute) => {
    semanticAnalysisModelAttribute(attribute, ctx)
  })
}

function semanticAnalysisModelAttribute(attribute: ModelAttribute, _ctx: Context): void {
  if (isDullAdminObjectValueType(attribute.type)) {
    if (attribute.optionals != null) {
      throw Error(`${attribute.toString()} can not have \`optionals\` when using object value type`)
    }

    const object = attribute.object!
    const attrNames = object.attributes.map((attr) => attr.name)
    const dupAttrNames = attrNames.filter((name, index) => attrNames.indexOf(name) !== index)
    if (dupAttrNames.length !== 0) {
      throw Error(`${attribute.toString()}'s attributes can not have duplicate name: ${JSON.stringify(dupAttrNames)}`)
    }
  }
}
