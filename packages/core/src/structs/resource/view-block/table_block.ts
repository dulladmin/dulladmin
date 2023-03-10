import { Dialog } from '../dialog'
import { ScalarValueType, Model } from '../model'
import { BlockType } from './base'

enum TableBlockSearcherPredicate {
  Eq = 'eq',
  Lt = 'lt',
  Gt = 'gt',
  Lteq = 'lteq',
  Gteq = 'gteq',
  Cont = 'cont'
}

class TableBlockSearcher {
  name: string
  predicate: TableBlockSearcherPredicate
  type: ScalarValueType | null
  optionals: Array<string | number | boolean> | null

  constructor(
    name: string,
    predicate: TableBlockSearcherPredicate,
    type: ScalarValueType | null,
    optionals: Array<string | number | boolean> | null
  ) {
    this.name = name
    this.predicate = predicate
    this.type = type
    this.optionals = optionals
  }

  toString(): string {
    return `#<TableBlockSearcher @name="${this.name}" @predicate="${this.predicate}">`
  }
}

enum TableBlockSorterDirection {
  Ascend = 'ascend',
  Descend = 'descend'
}

class TableBlockSorter {
  name: string
  directions: TableBlockSorterDirection[]

  constructor(name: string, directions: TableBlockSorterDirection[]) {
    this.name = name
    this.directions = directions
  }

  toString(): string {
    return `#<TableBlockSorter @name="${this.name}">`
  }
}

class TableBlockPagination {
  per: number | null

  constructor(per: number | null) {
    this.per = per
  }
}

class TableBlockOperation {
  name: string
  authority: string[] | null
  dialog: Dialog

  inheritedAuthority: string[] | null

  constructor(name: string, authority: string[] | null, dialog: Dialog) {
    this.name = name
    this.authority = authority
    this.dialog = dialog
    this.inheritedAuthority = null
  }

  toString(): string {
    return `#<TableBlockOperation @name="${this.name}">`
  }
}

/*
 * Render the data into a Table, e.g.
 *
 * Definition in `dulladmin/resources/users.yml`:
 *
 *  ```yml
 *  name: "users"
 *  views:
 *    index:
 *      table:
 *        items:
 *          - { name: "id", type: "int64" }
 *          - { name: "name", type: "string" }
 *          - { name: "email", type: "string" }
 *  ```
 *
 * Virtual DOM (route: `/users.html`):
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
 * Restful API, data receive from `GET /users/index/self.json`:
 *
 * ```json
 * {
 *  "code": 0,
 *  "msg": "ok",
 *  "data": {
 *    "collection": [{
 *      "id": 1,
 *      "name": "John Doe",
 *      "email": "johndoe@example.com"
 *    }]
 *  }
 * }
 * ```
 *
 * Note the item's id is required.
 */
class TableBlock {
  type: BlockType
  authority: string[] | null

  // Data Source
  name: string

  // Data Structuring
  model: Model

  // Sorter
  sorters: TableBlockSorter[]

  // Searcher
  searchers: TableBlockSearcher[]

  // Pagination
  pagination: TableBlockPagination | null

  // Operations
  operations: TableBlockOperation[]

  // Inherited Property
  inheritedAuthority: string[] | null

  constructor(
    name: string,
    authority: string[] | null,
    model: Model,
    sorters: TableBlockSorter[],
    searchers: TableBlockSearcher[],
    pagination: TableBlockPagination | null,
    operations: TableBlockOperation[]
  ) {
    this.type = BlockType.TableBlock
    this.name = name
    this.authority = authority
    this.model = model
    this.sorters = sorters
    this.searchers = searchers
    this.pagination = pagination
    this.operations = operations
    this.inheritedAuthority = null
  }

  toString(): string {
    return `#<TableBlock @name="${this.name}">`
  }
}

export {
  TableBlockSearcherPredicate,
  TableBlockSearcher,
  TableBlockSorterDirection,
  TableBlockSorter,
  TableBlockPagination,
  TableBlockOperation,
  TableBlock
}
export default TableBlock
