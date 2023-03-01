enum ScalarValueType {
  // https://developers.google.com/protocol-buffers/docs/proto3#scalar
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

  // Extended
  Datetime = 'datetime', // A `string` representing the datetime, formatted according to ISO8601
  Image = 'image' // A `string` representing the image
}

enum ObjectValueType {
  Object = 'object'
}

type ValueType = ScalarValueType | ObjectValueType

class ObjectValueAttribute {
  name: string
  type: ScalarValueType
  optionals: Array<string | number | boolean> | null
  collection: boolean

  constructor(
    name: string,
    type: ScalarValueType,
    optionals: Array<string | number | boolean> | null,
    collection: boolean
  ) {
    this.name = name
    this.type = type
    this.optionals = optionals
    this.collection = collection
  }

  toString(): string {
    return `#<ObjectValueAttribute @name="${this.name}">`
  }
}

class ObjectValue {
  attributes: ObjectValueAttribute[]

  constructor(attributes: ObjectValueAttribute[]) {
    this.attributes = attributes
  }
}

class ModelAttribute {
  name: string
  type: ValueType
  optionals: Array<string | number | boolean> | null
  collection: boolean
  object: ObjectValue | null

  hidden: boolean
  disabled: boolean

  constructor(
    name: string,
    type: ValueType,
    optionals: Array<string | number | boolean> | null,
    collection: boolean,
    object: ObjectValue | null,
    hidden: boolean | null,
    disabled: boolean | null
  ) {
    this.name = name
    this.type = type
    this.optionals = optionals
    this.collection = collection
    this.object = object
    this.hidden = hidden ?? false
    this.disabled = disabled ?? false
  }

  toString(): string {
    return `#<ModelAttribute @name="${this.name}">`
  }
}

class Model {
  attributes: ModelAttribute[]

  constructor(attributes: ModelAttribute[]) {
    this.attributes = attributes
  }
}

export { ScalarValueType, ObjectValueType, ValueType, ObjectValueAttribute, ObjectValue, ModelAttribute, Model }
export default Model
