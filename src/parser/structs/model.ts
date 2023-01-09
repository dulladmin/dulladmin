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
  Datetime = 'datetime' // A `string` representing the datetime, formatted according to ISO8601
}

enum ObjectValueType {
  Object = 'object'
}

class ObjectValueAttribute {
  name: string
  type: ScalarValueType
  collection: boolean

  constructor(name: string, type: ScalarValueType, collection: boolean) {
    this.name = name
    this.type = type
    this.collection = collection
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
  type: ScalarValueType | ObjectValueType
  collection: boolean
  object?: ObjectValue

  constructor(name: string, type: ScalarValueType | ObjectValueType, collection: boolean, object?: ObjectValue) {
    this.name = name
    this.type = type
    this.collection = collection
    this.object = object
  }
}

class Model {
  attributes: ModelAttribute[]

  constructor(attributes: ModelAttribute[]) {
    this.attributes = attributes
  }
}

export { ScalarValueType, ObjectValueType, ObjectValueAttribute, ObjectValue, ModelAttribute, Model }
export default Model
