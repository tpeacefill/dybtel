import { useState } from 'react'

export function useRowSelection(initialSelected: number = 0) {
  const [selectedRow, setSelectedRow] = useState(initialSelected)

  const selectRow = (index: number) => {
    setSelectedRow(index)
  }

  return {
    selectedRow,
    selectRow
  }
}
