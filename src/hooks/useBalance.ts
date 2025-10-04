import { useMemo } from 'react'
import { useTransactionStore } from '../store/transactionStore'

export function useBalance() {
  const { transactions } = useTransactionStore()

  const currentBalance = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount)
    }, 0)
  }, [transactions])

  const formattedBalance = useMemo(() => {
    return currentBalance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }, [currentBalance])

  return {
    currentBalance,
    formattedBalance
  }
}
