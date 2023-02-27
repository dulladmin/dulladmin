import { Resource, View, Block } from '../../../structs'

export class Context {
  resource: Resource
  view: View
  block: Block | null

  constructor(resource: Resource, view: View) {
    this.resource = resource
    this.view = view
    this.block = null
  }
}
