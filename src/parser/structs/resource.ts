import View from './view'

class Resource {
  name: string
  views: View[]
  plural: boolean

  constructor(name: string, views: View[]) {
    this.name = name
    this.views = views
    this.plural = true
  }
}

export { Resource }
export default Resource
