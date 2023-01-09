import Model from './model'

enum BlockType {
  TableBlock = 'table',
  DescriptionsBlock = 'descriptions',
  FormBlock = 'form'
}

enum BlockRelationshipType {
  Self = 'self',
  EmbedsOne = 'embeds_one',
  EmbedsMany = 'embeds_many'
}

/*
 * Render the data into a Table, e.g.
 *
 * Definition in `dulladmin/resources/user.yml`:
 *
 *  ```yml
 *  name: "user"
 *  views:
 *    index:
 *      blocks:
 *        - relationship: 'self'
 *          table:
 *            items:
 *              - { name: "id", type: "string" }
 *              - { name: "name", type: "string" }
 *              - { name: "email", type: "string" }
 *  ```
 *
 * Virtual DOM:
 *
 *  ```html
 *  <body>
 *    <table>
 *      <tr>
 *        <th>ID</th>
 *        <th>Name</th>
 *        <th>Email</th>
 *      </tr>
 *      <tr>
 *        <td>1</td>
 *        <td>John Doe</td>
 *        <td>johndoe@example.com</td>
 *      </tr>
 *    </table>
 *  </body>
 *  ```
 *
 * Restful API, data receive from `users#index`, a.k.a `GET /users`:
 *
 * ```json
 * {
 *  "status": 0,
 *  "msg": "ok",
 *  "data": {
 *    "users": [{
 *      "id": "1",
 *      "name": "John Doe",
 *      "email": "johndoe@example.com"
 *    }]
 *  }
 * }
 * ```
 *
 * Note the item's id is required, and must be a `string` type.
 */
class TableBlock {
  type: BlockType

  // Data Source
  relType: BlockRelationshipType
  relName: string

  // Data Structuring
  model: Model
  collection: boolean

  constructor(relType: BlockRelationshipType, relName: string, model: Model) {
    this.type = BlockType.TableBlock
    this.relType = relType
    this.relName = relName
    this.model = model
    this.collection = true
  }
}

/*
 * Render the data into a Descriptions, e.g.
 *
 * Definition in `dulladmin/resources/user.yml`:
 *
 *  ```yml
 *  name: "user"
 *  views:
 *    show:
 *      blocks:
 *        - relationship: 'self'
 *          descriptions:
 *            items:
 *              - { name: "id", type: "string" }
 *              - { name: "name", type: "string" }
 *              - { name: "email", type: "string" }
 *  ```
 *
 * Virtual DOM:
 *
 *  ```html
 *  <body>
 *    <table>
 *      <tr>
 *        <td>ID</td>
 *        <td>1</td>
 *      </tr>
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
 * Restful API, data receive from `users#show`, a.k.a `GET /users/:id`:
 *
 * ```json
 * {
 *  "status": 0,
 *  "msg": "ok",
 *  "data": {
 *    "id": "1",
 *    "name": "John Doe",
 *    "email": "johndoe@example.com"
 *  }
 * }
 * ```
 *
 * Note the item's id is required, and must be a `string` type.
 */
class DescriptionsBlock {
  type: BlockType

  // Data Source
  relType: BlockRelationshipType
  relName: string

  // Data Structuring
  model: Model
  collection: boolean

  constructor(relType: BlockRelationshipType, relName: string, model: Model) {
    this.type = BlockType.DescriptionsBlock
    this.relType = relType
    this.relName = relName
    this.model = model
    this.collection = false
  }
}

/*
 * Render the data into a Form, e.g.
 *
 * Definition in `dulladmin/resources/user.yml`:
 *
 *  ```yml
 *  name: "user"
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
 * Virtual DOM:
 *
 *  ```html
 *  <body>
 *    <form action="/users" method="POST">
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
 * Restful API, data receive from `users#new`, a.k.a `GET /users/new`,
 * and send to `users#create`, a.k.a `POST /users`:
 *
 * ```json
 * {
 *  "status": 0,
 *  "msg": "ok",
 *  "data": {
 *    "name": "",
 *    "email": ""
 *  }
 * }
 * ```
 *
 * In 'edit' View, data receive from `users#edit`, a.k.a `GET /users/:id/edit`,
 * and send to `users#update`, a.k.a `PUT /users/:id/update`. And note the
 * item's id is required, and must be a `string` type.
 */
class FormBlock {
  type: BlockType

  // Data Source
  relType: BlockRelationshipType
  relName: string

  // Data Structuring
  model: Model
  collection: boolean

  constructor(relType: BlockRelationshipType, relName: string, model: Model) {
    this.type = BlockType.FormBlock
    this.relType = relType
    this.relName = relName
    this.model = model
    this.collection = false
  }
}

// .
type Block = TableBlock | DescriptionsBlock | FormBlock

export { BlockType, BlockRelationshipType, TableBlock, DescriptionsBlock, FormBlock, Block }
export default Block
