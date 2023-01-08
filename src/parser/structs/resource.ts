import View from './view'

class Resource {
  name: string
  views: View[]

  constructor(name: string, views: View[]) {
    this.name = name
    this.views = views
  }
}

export { Resource }
export default Resource
