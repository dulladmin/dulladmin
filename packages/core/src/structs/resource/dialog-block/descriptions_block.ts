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

  // Data Source
  relName: string

  // Data Structuring
  model: Model
  collection: boolean

  constructor(relName: string, model: Model) {
    this.type = DialogBlockType.DescriptionsBlock
    this.model = model
    this.relName = relName
    this.collection = false
  }

  toString(): string {
    return `#<DialogDescriptionsBlock @name="${this.relName}">`
  }
}

export { DialogDescriptionsBlock }
export default DialogDescriptionsBlock
