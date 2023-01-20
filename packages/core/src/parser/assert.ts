import { BlockRelationshipType, ScalarValueType, ObjectValueType } from '../structs'

export function assertNotNull(fieldValue: unknown, fieldName: string): void {
  if (fieldValue != null) return
  throw new Error(`Field \`${fieldName}\` is required`)
}

export function assertIsArray(fieldValue: unknown, fieldName: string): void {
  if (Array.isArray(fieldValue)) return
  throw new Error(`Field \`${fieldName}\` must be an array`)
}

export function assertIsObject(fieldValue: unknown, fieldName: string): void {
  if (typeof fieldValue === 'object' && !Array.isArray(fieldValue) && fieldValue !== null) return
  throw new Error(`Field \`${fieldName}\` must be an object`)
}

export function assertIsString(fieldValue: unknown, fieldName: string): void {
  if (typeof fieldValue === 'string' || fieldValue instanceof String) return
  throw new Error(`Field \`${fieldName}\` must be a string`)
}

export function assertIsBlockRelationshipType(fieldValue: unknown, fieldName: string): void {
  if (Object.values(BlockRelationshipType).includes(fieldValue as BlockRelationshipType)) return
  throw new Error(`Field \`${fieldName}\` must be one of ["self", "embeds_one", "embeds_many"]}`)
}

export function assertIsDullAdminValueType(fieldValue: unknown, fieldName: string): void {
  if (Object.values(ScalarValueType).includes(fieldValue as ScalarValueType)) return
  if (Object.values(ObjectValueType).includes(fieldValue as ObjectValueType)) return
  throw new Error(`Field \`${fieldName}\` is not a legal value type`)
}

export function assertIsDullAdminScalarValueType(fieldValue: unknown, fieldName: string): void {
  if (Object.values(ScalarValueType).includes(fieldValue as ScalarValueType)) return
  throw new Error(`Field \`${fieldName}\` is not a legal scalar value type`)
}
