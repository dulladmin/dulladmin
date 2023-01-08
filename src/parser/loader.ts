import * as yaml from 'js-yaml'

interface YamlResourceType {
  name?: string
  views?: YamlViewsType
}

interface YamlViewsType {
  index?: YamlViewType
  show?: YamlViewType
  new?: YamlViewType
  edit?: YamlViewType
}

interface YamlViewType {
  blocks?: YamlBlockType[]
}

interface YamlBlockType {
  relationship?: string
  name?: string
  table?: YamlBlockTableType
  descriptions?: YamlBlockDescriptionsType
  form?: YamlBlockFormType
}

interface YamlBlockTableType {
  items?: YamlModelAttributeType[]
}

interface YamlBlockDescriptionsType {
  items?: YamlModelAttributeType[]
}

interface YamlBlockFormType {
  items?: YamlModelAttributeType[]
}

interface YamlModelAttributeType {
  name?: string
  type?: string
  attributes?: YamlModelAttributeObjectAttributeType[]
}

interface YamlModelAttributeObjectAttributeType {
  name?: string
  type?: string
}

function load(str: string): YamlResourceType {
  return yaml.load(str) as YamlResourceType
}

export {
  YamlResourceType,
  YamlViewsType,
  YamlViewType,
  YamlBlockType,
  YamlBlockTableType,
  YamlBlockDescriptionsType,
  YamlBlockFormType,
  YamlModelAttributeType,
  YamlModelAttributeObjectAttributeType,
  load
}
