import * as yaml from 'js-yaml'

export interface YamlResourceType {
  name?: string
  views?: YamlViewsType
}

export interface YamlViewsType {
  index?: YamlViewType
  show?: YamlViewType
  new?: YamlViewType
  edit?: YamlViewType
}

export interface YamlViewType {
  blocks?: YamlBlockType[]
}

export interface YamlBlockType {
  relationship?: string
  name?: string
  table?: YamlBlockTableType
  descriptions?: YamlBlockDescriptionsType
  form?: YamlBlockFormType
}

export interface YamlBlockTableType {
  items?: YamlModelAttributeType[]
}

export interface YamlBlockDescriptionsType {
  items?: YamlModelAttributeType[]
}

export interface YamlBlockFormType {
  items?: YamlModelAttributeType[]
}

export interface YamlModelAttributeType {
  name?: string
  type?: string
  attributes?: YamlModelAttributeObjectAttributeType[]
}

export interface YamlModelAttributeObjectAttributeType {
  name?: string
  type?: string
}

export function loadResource(str: string): YamlResourceType {
  return yaml.load(str) as YamlResourceType
}
