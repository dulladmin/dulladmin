import { App } from '../../structs'
import { loadApp } from './loader'
import { parseApp } from './parser'
import { semanticAnalysisApp } from './semantic'

export function parseAppFile(str: string): App {
  const app = parseApp(loadApp(str))
  semanticAnalysisApp(app)
  return app
}
