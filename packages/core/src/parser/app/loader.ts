import * as yaml from 'js-yaml'

export interface YamlAppType {
  menu?: YamlAppMenuType
}

export interface YamlAppMenuType {
  items?: Array<YamlAppMenuItemType | YamlAppSubMenuType>
}

export interface YamlAppSubMenuType {
  name?: string
  icon?: string
  items?: YamlAppMenuItemType[]
}

export interface YamlAppMenuItemType {
  name?: string
  icon?: string
  view?: string
}

export function loadApp(str: string): YamlAppType {
  return yaml.load(str) as YamlAppType
}
