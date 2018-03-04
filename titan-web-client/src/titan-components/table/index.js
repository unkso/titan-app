// components
export {default as Table} from './Table'
export {default as TableHeader} from './TableHeader'
export {default as TableBody} from './TableBody'
export {default as TableRow} from './TableRow'
export {default as TableRowCell} from './TableRowCell'

// styles
import { TableWrapper } from './Table'
import {
  TableHeaderInnerWrapper,
  TableHeaderRow,
  TableHeaderWrapper,
} from './TableHeader'
import { TableBodyInnerWrapper, TableBodyOuterWrapper } from './TableBody'
import { TableRowWrapper } from './TableRow'
import { TableRowCellWrapper } from './TableRowCell'

export const styles = {
  TableWrapper,
  TableHeaderWrapper,
  TableHeaderInnerWrapper,
  TableHeaderRow,
  TableBodyOuterWrapper,
  TableBodyInnerWrapper,
  TableRowWrapper,
  TableRowCellWrapper
}
