import View from './view'

class Resource {
  name: string
  views: View[]
  singular: boolean

  constructor(name: string, singular: boolean, views: View[]) {
    this.name = name
    this.singular = singular
    this.views = views
  }
}

export { Resource }
export default Resource
