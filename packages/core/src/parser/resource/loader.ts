import * as yaml from 'js-yaml'

export interface YamlResourceType {
  name?: string
  singular?: boolean
  authority?: string[]
  views?: YamlViewsType
}

export interface YamlViewsType {
  index?: YamlViewType
  show?: YamlViewType
  new?: YamlViewType
  edit?: YamlViewType
}

export interface YamlViewType {
  authority?: string[]
  blocks?: YamlBlockType[]
}

export interface YamlBlockType {
  relationship?: string
  name?: string
  authority?: string[]
  table?: YamlBlockTableType
  descriptions?: YamlBlockDescriptionsType
  form?: YamlBlockFormType
}

export interface YamlBlockTableType {
  items?: YamlModelAttributeType[]
  sorters?: YamlBlockTableSorterType[]
  searchers?: YamlBlockTableSearcherType[]
}

export interface YamlBlockTableSorterType {
  name?: string
  directions?: string[]
}

export interface YamlBlockTableSearcherType {
  name?: string
  predicate?: string
  type?: string
  optionals?: Array<string | number | boolean>
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
  optionals?: Array<string | number | boolean>
  attributes?: YamlModelAttributeObjectAttributeType[]
}

export interface YamlModelAttributeObjectAttributeType {
  name?: string
  type?: string
  optionals?: Array<string | number | boolean>
}

export function loadResource(str: string): YamlResourceType {
  return yaml.load(str) as YamlResourceType
}
