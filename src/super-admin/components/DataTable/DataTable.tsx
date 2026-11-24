import type { ReactNode } from 'react'
import EmptyState from '../EmptyState/EmptyState'

export interface DataTableColumn<Row> {
  id: string
  header: string
  render: (row: Row) => ReactNode
}

interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[]
  rows: Row[]
  getRowKey: (row: Row) => string
  emptyTitle: string
  emptyDescription: string
}

function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  emptyTitle,
  emptyDescription,
}: DataTableProps<Row>) {
  if (rows.length === 0) {
    return (
      <div className="surface-card">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    )
  }

  return (
    <div className="data-table__scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.id}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
