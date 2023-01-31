import Model from '../model'
import { BlockType, BlockRelationshipType } from './base'

/*
 * Render the data into a Form, e.g.
 *
 * Definition in `dulladmin/resources/users.yml`:
 *
 *  ```yml
 *  name: "users"
 *  views:
 *    new:
 *      blocks:
 *        - relationship: 'self'
 *          form:
 *            items:
 *              - { name: "name", type: "string" }
 *              - { name: "email", type: "string" }
 *  ```
 *
 * Virtual DOM (route: `/users/new.html`):
 *
 *  ```html
 *  <body>
 *    <form action="/users/new/self.json" method="PUT">
 *      <div>
 *        <label>Name</label>
 *        <input type="text"></input>
 *      </div>
 *      <div>
 *        <label>Email</label>
 *        <input type="text"></input>
 *      </div>
 *      <div>
 *        <button type="submit">Submit</button>
 *      </div>
 *    </form>
 *  </body>
 *  ```
 *
 * Restful API, data receive from `GET /users/new/self.json`,
 * and send to `PUT /users/new/self.json`.
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
 *
 * In EditView, data receive from `GET /users/:id/edit/self.json`,
 * and send to `PUT /users/:id/edit/self.json`.
 */
class FormBlock {
  type: BlockType
  authority: string[] | null

  // Data Source
  relType: BlockRelationshipType
  relName: string

  // Data Structuring
  model: Model
  collection: boolean

  constructor(relType: BlockRelationshipType, relName: string, authority: string[] | null, model: Model) {
    this.type = BlockType.FormBlock
    this.relType = relType
    this.relName = relName
    this.authority = authority
    this.model = model
    this.collection = false
  }
}

export { FormBlock }
export default FormBlock
