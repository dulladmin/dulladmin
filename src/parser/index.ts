import { Resource } from './structs'
import { loadResource } from './loader'
import { parseResource } from './parser'
import { semanticAnalysisResource } from './semantic'

function parseResourceFile(str: string): Resource {
  const resource = parseResource(loadResource(str))
  semanticAnalysisResource(resource)
  return resource
}

export { parseResourceFile }
