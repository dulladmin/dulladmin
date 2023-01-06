import View from './view'

class Resource {
  name: string
  views: View[]

  constructor(name: string) {
    this.name = name
    this.views = []
  }
}

export { Resource }
export default Resource
