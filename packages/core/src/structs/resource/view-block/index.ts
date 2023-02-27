import TableBlock from './table_block'
import DescriptionsBlock from './descriptions_block'
import FormBlock from './form_block'

type Block = TableBlock | DescriptionsBlock | FormBlock

export * from './base'
export * from './descriptions_block'
export * from './form_block'
export * from './table_block'
export { Block }
export default Block
