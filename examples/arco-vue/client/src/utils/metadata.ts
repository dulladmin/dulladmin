export enum ValueType {
  Double = 'double',
  Float = 'float',
  Int32 = 'int32',
  Int64 = 'int64',
  Uint32 = 'uint32',
  Uint64 = 'uint64',
  Sint32 = 'sint32',
  Sint64 = 'sint64',
  Fixed32 = 'fixed32',
  Fixed64 = 'fixed64',
  Sfixed32 = 'sfixed32',
  Sfixed64 = 'sfixed64',
  Bool = 'bool',
  String = 'string',
  Datetime = 'datetime',
  Object = 'object',
}

export function defaultValue<T>(metadata: Record<string, any>): T {
  switch (metadata.type as ValueType) {
    case ValueType.Double:
    case ValueType.Float:
    case ValueType.Int32:
    case ValueType.Int64:
    case ValueType.Uint32:
    case ValueType.Uint64:
    case ValueType.Sint32:
    case ValueType.Sint64:
    case ValueType.Fixed32:
    case ValueType.Fixed64:
    case ValueType.Sfixed32:
    case ValueType.Sfixed64:
      return 0 as T;
    case ValueType.Bool:
      return false as T;
    case ValueType.String:
    case ValueType.Datetime:
      return '' as T;
    case ValueType.Object:
    default:
      throw new Error(`Unknown value type \`${metadata.type}\``);
  }
}

export function isDefaultValue(value: unknown): boolean {
  switch (typeof value) {
    case 'number':
      return value === 0;
    case 'boolean':
      return value === false;
    case 'string':
      return value === '';
    default:
      throw new Error(`Unknown value type \`${typeof value}\``);
  }
}
