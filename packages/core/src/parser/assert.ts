import {
  BlockRelationshipType,
  ScalarValueType,
  ObjectValueType,
  TableBlockSorterDirection,
  TableBlockSearcherPredicate
} from '../structs'

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

const BlockRelationshipTypeValues = Object.values(BlockRelationshipType)
const BlockRelationshipTypeToStr = JSON.stringify(BlockRelationshipTypeValues)
export function assertIsBlockRelationshipType(fieldValue: unknown, fieldXPath: string): void {
  if (BlockRelationshipTypeValues.includes(fieldValue as BlockRelationshipType)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ${BlockRelationshipTypeToStr}`)
}

const ScalarValueTypeValues = Object.values(ScalarValueType)
const ScalarValueTypeToStr = JSON.stringify(ScalarValueTypeValues)
export function assertIsDullAdminScalarValueType(fieldValue: unknown, fieldXPath: string): void {
  if (ScalarValueTypeValues.includes(fieldValue as ScalarValueType)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ${ScalarValueTypeToStr}`)
}

const ObjectValueTypeValues = Object.values(ObjectValueType)
const ObjectValueTypeToStr = JSON.stringify(ObjectValueTypeValues)
export function assertIsDullAdminObjectValueType(fieldValue: unknown, fieldXPath: string): void {
  if (ObjectValueTypeValues.includes(fieldValue as ObjectValueType)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ${ObjectValueTypeToStr}`)
}

const ValueTypeValues = ([] as string[]).concat(ScalarValueTypeValues).concat(ObjectValueTypeValues)
const ValueTypeToStr = JSON.stringify(ValueTypeValues)
export function assertIsDullAdminValueType(fieldValue: unknown, fieldXPath: string): void {
  if (ScalarValueTypeValues.includes(fieldValue as ScalarValueType)) return
  if (ObjectValueTypeValues.includes(fieldValue as ObjectValueType)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ${ValueTypeToStr}`)
}

const TableBlockSorterDirectionValues = Object.values(TableBlockSorterDirection)
const TableBlockSorterDirectionToStr = JSON.stringify(TableBlockSorterDirectionValues)
export function assertIsTableBlockSorterDirection(fieldValue: unknown, fieldXPath: string): void {
  if (Object.values(TableBlockSorterDirection).includes(fieldValue as TableBlockSorterDirection)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ${TableBlockSorterDirectionToStr}`)
}

const TableBlockSearcherPredicateValues = Object.values(TableBlockSearcherPredicate)
const TableBlockSearcherPredicateToStr = JSON.stringify(TableBlockSearcherPredicateValues)
export function assertIsTableBlockSearcherPredicate(fieldValue: unknown, fieldXPath: string): void {
  if (TableBlockSearcherPredicateValues.includes(fieldValue as TableBlockSearcherPredicate)) return
  throw new Error(`Field \`${fieldXPath}\` must be one of ${TableBlockSearcherPredicateToStr}`)
}
