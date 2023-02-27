import Model from '../model'
import { DialogBlockType } from './base'

/*
 * Render the data into a Dialog with Descriptions, e.g.
 *
 * Definition:
 *
 *  ```yml
 *  ...
 *    ...
 *      show:
 *        descriptions:
 *          items:
 *            - { name: "name", type: "string" }
 *            - { name: "email", type: "string" }
 *  ```
 *
 * Virtual DOM:
 *
 *  ```html
 *  <dialog>
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
 *  </dialog>
 *  ```
 *
 * Restful API, data receive from `GET /.../.../:id/show.json`:
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
class DialogDescriptionsBlock {
  type: DialogBlockType

  // Data Structuring
  model: Model
  collection: boolean

  constructor(model: Model) {
    this.type = DialogBlockType.DescriptionsBlock
    this.model = model
    this.collection = false
  }

  toString(): string {
    return '#<DialogDescriptionsBlock>'
  }
}

export { DialogDescriptionsBlock }
export default DialogDescriptionsBlock
