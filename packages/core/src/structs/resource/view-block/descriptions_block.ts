import Model from '../model'
import { BlockType, BlockRelationshipType } from './base'

/*
 * Render the data into a Descriptions, e.g.
 *
 * Definition in `dulladmin/resources/users.yml`:
 *
 *  ```yml
 *  name: "users"
 *  views:
 *    show:
 *      descriptions:
 *        items:
 *          - { name: "name", type: "string" }
 *          - { name: "email", type: "string" }
 *  ```
 *
 * Virtual DOM (route: `/users/1.html`):
 *
 *  ```html
 *  <body>
 *    <table>
 *      <tr>
 *        <td>Name</td>
 *        <td>John Doe</td>
 *      </tr>
 *      <tr>
 *        <td>Email</td>
 *        <td>johndoe@example.com</td>
 *      </tr>
 *    </table>
 *  </body>
 *  ```
 *
 * Restful API, data receive from `GET /users/1/show/self.json`:
 *
 * ```json
 * {
 *  "code": 0,
 *  "msg": "ok",
 *  "data": {
 *    "model": {
 *      "name": "John Doe",
 *      "email": "johndoe@example.com"
 *    }
 *  }
 * }
 * ```
 */
class DescriptionsBlock {
  type: BlockType
  authority: string[] | null

  // Data Source
  relType: BlockRelationshipType
  relName: string

  // Data Structuring
  model: Model
  collection: boolean

  // Inherited Property
  inheritedAuthority: string[] | null

  constructor(relType: BlockRelationshipType, relName: string, authority: string[] | null, model: Model) {
    this.type = BlockType.DescriptionsBlock
    this.relType = relType
    this.relName = relName
    this.authority = authority
    this.model = model
    this.collection = false
    this.inheritedAuthority = null
  }

  toString(): string {
    return `#<DescriptionsBlock @name="${this.relName}">`
  }
}

export { DescriptionsBlock }
export default DescriptionsBlock
