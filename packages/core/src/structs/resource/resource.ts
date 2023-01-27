import View from './view'

class Resource {
  name: string
  views: View[]
  singular: boolean

  constructor(name: string, views: View[]) {
    this.name = name
    this.views = views
    this.singular = false
  }
}

export { Resource }
export default Resource
