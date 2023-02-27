import { YamlModelAttributeType } from './model'

export interface YamlViewType {
  authority?: string[]
  blocks?: YamlBlockType[]
  table?: YamlBlockTableType
  descriptions?: YamlBlockDescriptionsType
  form?: YamlBlockFormType
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
  pagination?: YamlBlockTablePaginationType
  operations?: any[]
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

export interface YamlBlockTablePaginationType {
  per?: number
}

export interface YamlBlockDescriptionsType {
  items?: YamlModelAttributeType[]
}

export interface YamlBlockFormType {
  items?: YamlModelAttributeType[]
}
