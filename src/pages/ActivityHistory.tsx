import { useNavigate } from 'react-router-dom'
import { useTransactionStore } from '../store/transactionStore'
import NavigationBar from '../components/NavigationBar'
import EmptyState from '../components/EmptyState'
import TransactionTable from '../components/TransactionTable'
import CurvedSection from '../components/CurvedSection'
import { useRowSelection } from '../hooks/useRowSelection'

export default function ActivityHistory() {
  const navigate = useNavigate()
  const { transactions } = useTransactionStore()
  const { selectedRow, selectRow } = useRowSelection()

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar */}
      <NavigationBar onBack={() => navigate('/dashboard')} />

      {/* Page Title */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 my-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-green-600">Activity History</h1>
      </div>

      {/* Green curved section */}
      <CurvedSection>
        {transactions.length === 0 ? (
          <EmptyState 
            title="No transactions yet"
            subtitle="Complete a top-up to see your activity history"
          />
        ) : (
          <TransactionTable 
            transactions={transactions}
            selectedRow={selectedRow}
            onRowSelect={selectRow}
          />
        )}
      </CurvedSection>
    </div>
  )
}