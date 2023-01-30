import View from './view'

class Resource {
  name: string
  singular: boolean
  authority: string[] | null
  views: View[]

  constructor(name: string, singular: boolean, authority: string[] | null, views: View[]) {
    this.name = name
    this.singular = singular
    this.authority = authority
    this.views = views
  }
}

export { Resource }
export default Resource
