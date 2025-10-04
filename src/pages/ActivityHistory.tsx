import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTransactionStore } from '../store/transactionStore'

export default function ActivityHistory() {
  const [selectedRow, setSelectedRow] = useState(0)
  const navigate = useNavigate()
  const { transactions } = useTransactionStore()

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1 sm:gap-2 cursor-pointer"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          <span className="text-green-600 font-light text-sm sm:text-base">Back to Dashboard</span>
        </button>
        
        <div className="flex items-center gap-4 text-gray-400">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
          </svg>
          <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Page Title */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 my-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-green-600">Activity History</h1>
      </div>

      {/* Green curved section */}
      <div className="relative w-full pb-5">
        {/* SVG curved section */}
        <svg
          className="w-full"
          viewBox="0 0 375 120"
          preserveAspectRatio="none"
          style={{ height: '120px', backgroundColor: '#2caf51' }}
        >
          <path
            d="M 0,120 Q 187.5,0 375,120 L 375,0 L 0,0 Z"
            fill="white"
          />
        </svg>
        
        {/* Table container with overlap */}
        <div className="px-4 pt-8 pb-20 bg-gradient-to-b from-primary to-[#29664f] -mt-10 sm:-mt-8">
          <div className="relative bg-gradient-to-b from-green-500 to-green-600 rounded-3xl overflow-hidden">
            {/* Table Headers */}
            <div className="grid grid-cols-4 gap-4 px-4 py-4" style={{ backgroundColor: '#2c5b53' }}>
              <div className="text-white font-semibold text-sm text-center">ID</div>
              <div className="text-white font-semibold text-sm text-center">Ward</div>
              <div className="text-white font-semibold text-sm text-center">Date</div>
              <div className="text-white font-semibold text-sm text-center">Amount</div>
            </div>

            {/* Table Rows */}
            <div className="h-96 overflow-y-auto space-y-[0.5px] bg-gradient-to-b from-[#2c9951] to-[#2a7150]">
              {transactions.length === 0 ? (
                <div className="px-4 py-8 text-center text-white">
                  <p>No transactions yet</p>
                  <p className="text-sm text-gray-300 mt-2">Complete a top-up to see your activity history</p>
                </div>
              ) : (
                transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  onClick={() => setSelectedRow(index)}
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}