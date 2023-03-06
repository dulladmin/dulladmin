import { YamlViewType } from './view'

export interface YamlResourceType {
  name?: string
  singular?: boolean
  authority?: string[]
  views?: YamlViewsType
}

export interface YamlViewsType {
  index?: YamlViewType
  new?: YamlViewType
  show?: YamlViewType
  edit?: YamlViewType
  delete?: YamlViewType
}
