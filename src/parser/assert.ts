import { BlockRelationshipType } from './structs'

function assertNotNull(fieldValue: unknown, fieldName: string): void {
  if (fieldValue != null) return
  throw new Error(`Field \`${fieldName}\` is required`)
}

function assertIsArray(fieldValue: unknown, fieldName: string): void {
  if (Array.isArray(fieldValue)) return
  throw new Error(`Field \`${fieldName}\` must be an array`)
}

function assertIsObject(fieldValue: unknown, fieldName: string): void {
  if (typeof fieldValue === 'object' && !Array.isArray(fieldValue) && fieldValue !== null) return
  throw new Error(`Field \`${fieldName}\` must be an object`)
}

function assertIsString(fieldValue: unknown, fieldName: string): void {
  if (typeof fieldValue === 'string' || fieldValue instanceof String) return
  throw new Error(`Field \`${fieldName}\` must be a string`)
}

function assertIsBlockRelationshipType(fieldValue: unknown, fieldName: string): void {
  if (Object.values(BlockRelationshipType).includes(fieldValue as BlockRelationshipType)) return
  throw new Error(`Field \`${fieldName}\` must be one of ["self", "has_one", "has_many"]}`)
}

export { assertNotNull, assertIsArray, assertIsObject, assertIsString, assertIsBlockRelationshipType }
