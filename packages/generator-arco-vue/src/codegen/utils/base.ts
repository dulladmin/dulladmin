import { ScalarValueType, ObjectValueType } from '@dulladmin/core'

export function toJsonType(valueType: ScalarValueType | ObjectValueType): string {
  switch (valueType) {
    case ScalarValueType.Double:
    case ScalarValueType.Float:
    case ScalarValueType.Int32:
    case ScalarValueType.Int64:
    case ScalarValueType.Uint32:
    case ScalarValueType.Uint64:
    case ScalarValueType.Sint32:
    case ScalarValueType.Sint64:
    case ScalarValueType.Fixed32:
    case ScalarValueType.Fixed64:
    case ScalarValueType.Sfixed32:
    case ScalarValueType.Sfixed64:
      return 'number'
    case ScalarValueType.Bool:
      return 'boolean'
    case ScalarValueType.String:
      return 'string'
    case ScalarValueType.Datetime:
      return 'string'
    case ScalarValueType.Image:
      return 'string'
    case ObjectValueType.Object:
      return 'object'
    default:
      throw new Error(`Unknown value type \`${valueType as string}\``)
  }
}
