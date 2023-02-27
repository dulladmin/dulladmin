import DialogDescriptionsBlock from './descriptions_block'
import DialogFormBlock from './form_block'

type DialogBlock = DialogDescriptionsBlock | DialogFormBlock

export * from './base'
export * from './descriptions_block'
export * from './form_block'
export { DialogBlock }
export default DialogBlock
