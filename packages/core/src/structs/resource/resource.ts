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

  toString(): string {
    return `#<Resource @name="${this.name}">`
  }
}

export { Resource }
export default Resource
