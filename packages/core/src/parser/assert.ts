import { BlockRelationshipType, ScalarValueType, ObjectValueType, TableBlockSorterDirection } from '../structs'

export function assertFieldNames(doc: unknown, allowedFiledNames: string[], fieldXPath: string): void {
  Object.keys(doc as object).forEach((name) => {
    if (name.startsWith('_')) return
    if (allowedFiledNames.includes(name)) return
    throw new Error(`Unknown field name \`${name}\` in \`${fieldXPath}\``)
  })
}

export function assertNotNull(fieldValue: unknown, fieldXPath: string): void {
  if (fieldValue != null) return
  throw new Error(`Field \`${fieldXPath}\` is required`)
}

export function assertIsArray(fieldValue: unknown, fieldXPath: string): void {
  if (Array.isArray(fieldValue)) return
  throw new Error(`Field \`${fieldXPath}\` must be an array`)
}

export function assertIsObject(fieldValue: unknown, fieldXPath: string): void {
  if (typeof fieldValue === 'object' && !Array.isArray(fieldValue) && fieldValue !== null) return
  throw new Error(`Field \`${fieldXPath}\` must be an object`)
}

export function assertIsString(fieldValue: unknown, fieldXPath: string): void {
  if (typeof fieldValue === 'string' || fieldValue instanceof String) return
  throw new Error(`Field \`${fieldXPath}\` must be a string`)
}

export function assertIsBlockRelationshipType(fieldValue: unknown, fieldXPath: string): void {
  if (Object.values(BlockRelationshipType).includes(fieldValue as BlockRelationshipType)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ["self", "embeds_one", "embeds_many"]}`)
}

export function assertIsDullAdminValueType(fieldValue: unknown, fieldXPath: string): void {
  if (Object.values(ScalarValueType).includes(fieldValue as ScalarValueType)) return
  if (Object.values(ObjectValueType).includes(fieldValue as ObjectValueType)) return
  throw new Error(`Field \`${fieldXPath}\` is not a legal value type`)
}

export function assertIsDullAdminScalarValueType(fieldValue: unknown, fieldXPath: string): void {
  if (Object.values(ScalarValueType).includes(fieldValue as ScalarValueType)) return
  throw new Error(`Field \`${fieldXPath}\` is not a legal scalar value type`)
}

export function assertIsTableBlockSorterDirection(fieldValue: unknown, fieldXPath: string): void {
  if (Object.values(TableBlockSorterDirection).includes(fieldValue as TableBlockSorterDirection)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ["ascend", "descend"]}`)
}
