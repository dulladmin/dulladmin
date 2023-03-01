import { Dialog, DialogDescriptionsBlock, DialogFormBlock } from '../../../structs'
import { assertFieldNames, assertNotNull, assertIsArray, assertIsString } from '../../assert'
import { YamlDialogType } from '../loader'
import { parseModel } from './model'

export function parseDialog(doc: YamlDialogType, xpath: string): Dialog {
  const allowedFiledNames = ['name', 'descriptions', 'form']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const attrs = { name }
  if (doc.descriptions != null) return parseDescriptionsDialog(doc, xpath, attrs)
  if (doc.form != null) return parseFormDialog(doc, xpath, attrs)
  throw new Error(`Dialog is required in \`${xpath}\`, must be one of ["descriptions", "form"]`)
}

function parseDescriptionsDialog(doc: YamlDialogType, xpath: string, attrs: Record<string, any>): Dialog {
  const { name } = attrs
  const descriptions = doc.descriptions ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(descriptions, allowedFiledNames, xpath + '/descriptions')

  const model = descriptions.items
  const modelXPath = xpath + '/descriptions/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath, { descriptions: true })
  const parsedDialogBlock = new DialogDescriptionsBlock(parsedModel)

  return new Dialog(name, parsedDialogBlock, null)
}

function parseFormDialog(doc: YamlDialogType, xpath: string, attrs: Record<string, any>): Dialog {
  const { name } = attrs
  const form = doc.form ?? {}

  const allowedFiledNames = ['items']
  assertFieldNames(form, allowedFiledNames, xpath + '/form')

  const model = form.items
  const modelXPath = xpath + '/form/items'
  assertNotNull(model, modelXPath)
  assertIsArray(model, modelXPath)
  const parsedModel = parseModel(model!, modelXPath, { form: true })
  const parsedDialogBlock = new DialogFormBlock(parsedModel)

  return new Dialog(name, parsedDialogBlock, null)
}
