import { create } from 'zustand'

export interface Transaction {
  id: string
  email: string
  phone: string
  amount: string
  wardSerialId: string
  wardName: string
  date: string
}

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'wardName'>) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  addTransaction: (transactionData) => {
    const newTransaction: Transaction = {
      id: (Date.now() + Math.random()).toString(36).substr(2, 9), // Generate unique ID
      ...transactionData,
      date: new Date().toLocaleDateString('en-GB'), // Format: DD/MM/YY
      wardName: getWardNameById(transactionData.wardSerialId) || 'Unknown Ward'
    }
    
    set((state) => ({
      transactions: [newTransaction, ...state.transactions] // Add to beginning of array
    }))
  }
}))

// Helper function to get ward name by ID (moved from data.ts for easier access)
const getWardNameById = (id: string): string | undefined => {
  const wardSerialData = [
    { id: '001', name: 'Alpha Ward' },
    { id: '002', name: 'Beta Ward' },
    { id: '003', name: 'Gamma Ward' },
    { id: '004', name: 'Delta Ward' },
    { id: '005', name: 'Epsilon Ward' },
    { id: '006', name: 'Zeta Ward' },
    { id: '007', name: 'Eta Ward' },
    { id: '008', name: 'Theta Ward' },
    { id: '009', name: 'Iota Ward' },
    { id: '010', name: 'Kappa Ward' },
    { id: '011', name: 'Lambda Ward' },
    { id: '012', name: 'Mu Ward' },
    { id: '013', name: 'Nu Ward' },
    { id: '014', name: 'Xi Ward' },
    { id: '015', name: 'Omicron Ward' },
    { id: '016', name: 'Pi Ward' },
    { id: '017', name: 'Rho Ward' },
    { id: '018', name: 'Sigma Ward' },
    { id: '019', name: 'Tau Ward' },
    { id: '020', name: 'Upsilon Ward' },
  ]
  
  const ward = wardSerialData.find(ward => ward.id === id)
  return ward?.name
}
