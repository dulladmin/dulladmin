import { YamlViewType } from './view'

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
  delete?: YamlViewType
}
