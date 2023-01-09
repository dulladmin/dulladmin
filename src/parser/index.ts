import { Resource } from './structs'
import { load } from './loader'
import { parseResource } from './parser'
import { semanticAnalysisResource } from './semantic'

function parse(str: string): Resource {
  const resource = parseResource(load(str))
  semanticAnalysisResource(resource)
  return resource
}

export { parse }
