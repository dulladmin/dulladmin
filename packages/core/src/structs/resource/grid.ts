class Grid {
  items: GridItem[]
  cols: number

  constructor(items: GridItem[]) {
    this.items = items
    this.cols = 24
  }

  toString(): string {
    return '#<Grid>'
  }
}

class GridItem {
  name: string
  span: number | Record<string, number>

  constructor(name: string, span: number | Record<string, number> | null) {
    this.name = name
    this.span = span ?? 24
  }

  toString(): string {
    return `#<GridItem @name="${this.name}">`
  }
}

export { Grid, GridItem }
export default Grid
