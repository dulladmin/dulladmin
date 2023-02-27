import Model from '../model'
import { DialogBlockType } from './base'

/*
 * Render the data into a Dialog with Form, e.g.
 *
 * Definition:
 *
 *  ```yml
 *  ...
 *    ...
 *      new:
 *        form:
 *          items:
 *            - { name: "name", type: "string" }
 *            - { name: "email", type: "string" }
 *  ```
 *
 * Virtual DOM:
 *
 *  ```html
 *  <dialog>
 *    <form action="/.../.../new.json" method="PUT">
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
 *  </dialog>
 *  ```
 *
 * Restful API, data receive from `GET /.../.../new.json`,
 * and send to `PUT /.../.../new.json`.
 *
 * ```json
 * {
 *  "code": 0,
 *  "msg": "ok",
 *  "data": {
 *    "form": {
 *      "name": "John Doe",
 *      "email": "johndoe@example.com"
 *    }
 *  }
 * }
 * ```
 *
 * In EditDialogView, data receive from `GET /.../.../:id/edit.json`,
 * and send to `PUT /.../.../:id/edit.json`.
 */
class DialogFormBlock {
  type: DialogBlockType

  // Data Source
  relName: string

  // Data Structuring
  model: Model
  collection: boolean

  constructor(relName: string, model: Model) {
    this.type = DialogBlockType.FormBlock
    this.relName = relName
    this.model = model
    this.collection = false
  }

  toString(): string {
    return `#<DialogFormBlock @name="${this.relName}">`
  }
}

export { DialogFormBlock }
export default DialogFormBlock
