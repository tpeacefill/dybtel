interface TransactionTableProps {
  transactions: Array<{
    id: string
    wardSerialId: string
    wardName: string
    date: string
    amount: string
  }>
  selectedRow: number
  onRowSelect: (index: number) => void
}

export default function TransactionTable({ 
  transactions, 
  selectedRow, 
  onRowSelect 
}: TransactionTableProps) {
  const headers = ['ID', 'Ward', 'Date', 'Amount']

  return (
    <div className="relative bg-gradient-to-b from-green-500 to-green-600 rounded-3xl overflow-hidden">
      {/* Table Headers */}
      <div className="grid grid-cols-4 gap-4 px-4 py-4" style={{ backgroundColor: '#2c5b53' }}>
        {headers.map((header) => (
          <div key={header} className="text-white font-semibold text-sm text-center">
            {header}
          </div>
        ))}
      </div>

      {/* Table Rows */}
      <div className="h-96 overflow-y-auto space-y-[0.5px] bg-gradient-to-b from-[#2c9951] to-[#2a7150]">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            onClick={() => onRowSelect(index)}
            className={`grid grid-cols-4 gap-4 px-4 py-4 cursor-pointer transition-colors ${
              index === 0
                ? 'border-2 border-[#0d9aff]'
                : selectedRow === index
                ? 'border-2 border-[#0d9aff]'
                : ''
            }`}
            style={{ 
              backgroundColor: '#64a78b',
              borderBottom: (index === 0 || selectedRow === index) ? '2px solid #60a5fa' : 
                           (index < transactions.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none')
            }}
          >
            <div className="text-white text-sm text-center">{transaction.wardSerialId}</div>
            <div className="text-white text-sm text-center">{transaction.wardName}</div>
            <div className="text-white text-sm text-center">{transaction.date}</div>
            <div className="text-white text-sm text-center">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
