import * as yaml from 'js-yaml'
import { YamlResourceType } from './resource'

export * from './resource'
export * from './view'
export * from './dialog'
export * from './model'

export function loadResource(str: string): YamlResourceType {
  return yaml.load(str) as YamlResourceType
}
