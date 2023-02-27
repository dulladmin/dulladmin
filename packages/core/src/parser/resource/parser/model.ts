import {
  ScalarValueType,
  ObjectValueType,
  ValueType,
  ObjectValueAttribute,
  ObjectValue,
  ModelAttribute,
  Model
} from '../../../structs'
import {
  assertFieldNames,
  assertNotNull,
  assertIsArray,
  assertIsString,
  assertIsDullAdminValueType,
  assertIsDullAdminScalarValueType
} from '../../assert'
import { YamlModelAttributeType, YamlModelAttributeObjectAttributeType } from '../loader'

export function parseModel(doc: YamlModelAttributeType[], xpath: string, options: Record<string, boolean>): Model {
  const parsedAttributes = doc.map((item, idx) => parseModelAttribute(item, xpath + `[${idx}]`, options))
  return new Model(parsedAttributes)
}

function parseModelAttribute(
  doc: YamlModelAttributeType,
  xpath: string,
  options: Record<string, boolean>
): ModelAttribute {
  const allowedFiledNames = ['name', 'type', 'optionals', 'attributes']
  if (options.table) {
    allowedFiledNames.push('hidden')
  } else if (options.form) {
    allowedFiledNames.push('hidden')
    allowedFiledNames.push('hidden')
  }
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  let type = doc.type
  let collection = false
  const typeXPath = xpath + '/type'
  assertNotNull(type, typeXPath)
  assertIsString(type, typeXPath)
  assertIsDullAdminValueType(type!.replace('[]', ''), typeXPath)
  if (type!.endsWith('[]')) {
    type = type!.replace('[]', '')
    collection = true
  }

  const optionals = doc.optionals ?? null
  const optionalsXPath = xpath + '/optionals'
  if (optionals != null) {
    assertIsArray(optionals, optionalsXPath)
  }

  let object = null
  if (type === ObjectValueType.Object) {
    const attributes = doc.attributes
    const attributesXPath = xpath + '/attributes'
    assertNotNull(attributes, attributesXPath)
    assertIsArray(attributes, attributesXPath)
    object = parseObject(attributes!, attributesXPath)
  }

  const hidden = doc.hidden ?? null
  const disabled = doc.disabled ?? null

  return new ModelAttribute(name!, type as ValueType, optionals, collection, object, hidden, disabled)
}

function parseObject(doc: YamlModelAttributeObjectAttributeType[], xpath: string): ObjectValue {
  const parsedAttributes = doc.map((item, idx) => parseObjectAttribute(item, xpath + `[${idx}]`))
  return new ObjectValue(parsedAttributes)
}

function parseObjectAttribute(doc: YamlModelAttributeObjectAttributeType, xpath: string): ObjectValueAttribute {
  const allowedFiledNames = ['name', 'type', 'optionals']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  let type = doc.type
  let collection = false
  const typeXPath = xpath + '/type'
  assertNotNull(type, typeXPath)
  assertIsString(type, typeXPath)
  assertIsDullAdminScalarValueType(type!.replace('[]', ''), typeXPath)
  if (type!.endsWith('[]')) {
    type = type!.replace('[]', '')
    collection = true
  }

  const optionals = doc.optionals ?? null
  const optionalsXPath = xpath + '/optionals'
  if (optionals != null) {
    assertIsArray(optionals, optionalsXPath)
  }

  return new ObjectValueAttribute(name!, type as ScalarValueType, optionals, collection)
}
