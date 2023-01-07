class ModelAttribute {
  name: string
  type: string

  constructor(name: string) {
    this.name = name
    this.type = ''
  }
}

class Model {
  attributes: ModelAttribute[]

  constructor() {
    this.attributes = []
  }
}

export { ModelAttribute, Model }
export default Model
