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
  Image = 'image',
  Object = 'object',
}

export function val2str(
  value: unknown,
  metadata: Record<string, any>
): string | null {
  if (value == null) return null;

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
      return String(value);
    case ValueType.Bool:
      return String(value);
    case ValueType.String:
      return String(value);
    case ValueType.Datetime:
      return String(value);
    case ValueType.Image:
      return String(value);
    case ValueType.Object:
    default:
      throw new Error(`Unknown value type \`${metadata.type}\``);
  }
}

export function str2val(
  value: string | null,
  metadata: Record<string, any>
): string | number | boolean | null {
  if (value == null) return null;

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
      if (value === '') return null;
      return Number(value);
    case ValueType.Bool:
      if (value === '') return null;
      return value === 'true';
    case ValueType.String:
      return String(value);
    case ValueType.Datetime:
      return String(value);
    case ValueType.Image:
      return String(value);
    case ValueType.Object:
    default:
      throw new Error(`Unknown value type \`${metadata.type}\``);
  }
}
