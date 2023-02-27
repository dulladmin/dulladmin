export interface YamlModelAttributeType {
  name?: string
  type?: string
  optionals?: Array<string | number | boolean>
  attributes?: YamlModelAttributeObjectAttributeType[]
  hidden?: boolean
  disabled?: boolean
}

export interface YamlModelAttributeObjectAttributeType {
  name?: string
  type?: string
  optionals?: Array<string | number | boolean>
}
