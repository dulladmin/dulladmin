import {
  View,
  BlockType,
  TableBlock,
  TableBlockSorter,
  TableBlockSearcher,
  TableBlockOperation,
  DescriptionsBlock,
  FormBlock,
  EChartsBlock,
  CustomBlock,
  Block,
  Grid,
  GridItem
} from '../../../structs'
import { isDullAdminScalarValueType } from '../../assert'
import { Context } from './base'
import { semanticAnalysisDialog } from './dialog'
import { semanticAnalysisModel } from './model'

export function semanticAnalysisView(view: View, ctx: Context): void {
  view.inheritedAuthority = ctx.resource.authority ?? view.authority

  const blockNames = view.blocks.map((block) => block.name)
  const dupBlockNames = blockNames.filter((name, index) => blockNames.indexOf(name) !== index)
  if (dupBlockNames.length !== 0) {
    throw Error(`${view.toString()}'s blocks can not have duplicate name: ${JSON.stringify(dupBlockNames)}`)
  }

  view.blocks.forEach((block) => {
    ctx.block = block
    semanticAnalysisBlock(block, ctx)
  })

  semanticAnalysisGrid(view.grid, ctx)
}

function semanticAnalysisBlock(block: Block, ctx: Context): void {
  block.inheritedAuthority = ctx.view.inheritedAuthority ?? block.authority

  switch (block.type) {
    case BlockType.TableBlock:
      semanticAnalysisTableBlock(block as TableBlock, ctx)
      break
    case BlockType.DescriptionsBlock:
      semanticAnalysisDescriptionsBlock(block as DescriptionsBlock, ctx)
      break
    case BlockType.FormBlock:
      semanticAnalysisFormBlock(block as FormBlock, ctx)
      break
    case BlockType.EChartsBlock:
      semanticAnalysisEChartsBlock(block as EChartsBlock, ctx)
      break
    case BlockType.CustomBlock:
      semanticAnalysisCustomBlock(block as CustomBlock, ctx)
      break
  }
}

function semanticAnalysisTableBlock(block: TableBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx, block)
  semanticAnalysisTableSorter(block.sorters, ctx)
  semanticAnalysisTableSearcher(block.searchers, ctx)
  semanticAnalysisTableOperations(block.operations, ctx)
}

function semanticAnalysisTableSorter(sorters: TableBlockSorter[], ctx: Context): void {
  const block = ctx.block as TableBlock

  const sorterNames = sorters.map((sorter) => sorter.name)
  const dupSorterNames = sorterNames.filter((name, index) => sorterNames.indexOf(name) !== index)
  if (dupSorterNames.length !== 0) {
    throw Error(`${block.toString()}'s sorters can not have duplicate name: ${JSON.stringify(dupSorterNames)}`)
  }

  sorters.forEach((sorter) => {
    const attr = block.model.attributes.find((attr) => attr.name === sorter.name)
    if (attr == null) {
      throw Error(`${sorter.toString()}'s name must be defined in items`)
    }
  })
}

function semanticAnalysisTableSearcher(searchers: TableBlockSearcher[], ctx: Context): void {
  const block = ctx.block as TableBlock

  const searcherNames = searchers.map((searcher) => searcher.name + '_' + searcher.predicate)
  const dupSearcherNames = searcherNames.filter((name, index) => searcherNames.indexOf(name) !== index)
  if (dupSearcherNames.length !== 0) {
    throw Error(
      `${block.toString()}'s searchers can not have duplicate (name, predicate): ${JSON.stringify(dupSearcherNames)}`
    )
  }

  searchers.forEach((searcher) => {
    if (searcher.type != null) {
      return
    }

    const attr = block.model.attributes.find((attr) => attr.name === searcher.name)
    if (attr == null) {
      throw Error(`${searcher.toString()}'s name must be defined in items`)
    }
    if (!isDullAdminScalarValueType(attr.type)) {
      throw Error(`${searcher.toString()}'s associated item's type must be a scalar value type`)
    }
  })
}

function semanticAnalysisTableOperations(operations: TableBlockOperation[], ctx: Context): void {
  const block = ctx.block as TableBlock

  operations.forEach((operation) => {
    operation.inheritedAuthority = block.inheritedAuthority ?? operation.authority
    semanticAnalysisDialog(operation.dialog, ctx)
  })
}

function semanticAnalysisDescriptionsBlock(block: DescriptionsBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx, block)
}

function semanticAnalysisFormBlock(block: FormBlock, ctx: Context): void {
  semanticAnalysisModel(block.model, ctx, block)
}

function semanticAnalysisEChartsBlock(_block: EChartsBlock, _ctx: Context): void {}

function semanticAnalysisCustomBlock(_block: CustomBlock, _ctx: Context): void {}

function semanticAnalysisGrid(grid: Grid | null, ctx: Context): void {
  if (grid == null) {
    const items = ctx.view.blocks.map((block) => new GridItem(block.name, null))
    ctx.view.computedGrid = new Grid(items)
    return
  }

  ctx.view.computedGrid = grid!
  ctx.view.computedGrid.items.forEach((item) => {
    const block = ctx.view.blocks.find((block) => block.name === item.name)
    if (block == null) {
      throw Error(`${item.toString()}'s name must be defined in items`)
    }
  })
}
