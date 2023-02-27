import { YamlModelAttributeType } from './model'

export interface YamlDialogType {
  name?: string
  descriptions?: YamlDialogDescriptionsType
  form?: YamlDialogFormType
}

export interface YamlDialogDescriptionsType {
  items?: YamlModelAttributeType[]
}

export interface YamlDialogFormType {
  items?: YamlModelAttributeType[]
}
