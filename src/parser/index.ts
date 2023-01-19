import { Resource, ViewType, View } from './structs'
import { loadResource } from './loader'
import { parseResource } from './parser'
import { semanticAnalysisResource } from './semantic'

export { Resource, ViewType, View }
export function parseResourceFile(str: string): Resource {
  const resource = parseResource(loadResource(str))
  semanticAnalysisResource(resource)
  return resource
}
