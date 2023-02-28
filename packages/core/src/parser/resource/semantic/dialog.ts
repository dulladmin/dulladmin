import { Dialog, DialogBlock } from '../../../structs'
import { Context } from './base'
import { semanticAnalysisModel } from './model'

export function semanticAnalysisDialog(dialog: Dialog, ctx: Context): void {
  semanticAnalysisDialogBlock(dialog.block, ctx)
}

function semanticAnalysisDialogBlock(dialogBlock: DialogBlock, ctx: Context): void {
  semanticAnalysisModel(dialogBlock.model, ctx, dialogBlock)
}
