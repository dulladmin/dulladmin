import { Resource } from '../../../structs'
import { Context } from './base'
import { semanticAnalysisView } from './view'

export function semanticAnalysisResource(resource: Resource): void {
  resource.views.forEach((view) => {
    if (resource.singular) {
      if (view.name === 'index') {
        throw Error(`${resource.toString()} is a singular resource, can not have IndexView`)
      }
    }

    const ctx = new Context(resource, view)
    semanticAnalysisView(view, ctx)
  })
}
